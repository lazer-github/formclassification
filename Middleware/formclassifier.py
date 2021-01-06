import csv
import datetime
import time

import cv2
import pytesseract
import os
import re
import nltk
# import spacy
import truecase


from textClassify import classify
from formClassificationAPI import get, patch
from userDefinedTypes import JobUpdate, FormUpdate

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

'''
#Preprocessing of images:
1. resize image
2. crop/slicing image
3. threshold image (convert to gray, and binary image) if required 

# Processing 
1. OCR - text extraction process

# Post processing
1. Parse_text
2. Clean text - Remove stop words.
3. Remove strings that has special characters in it.
4. Natural language noise - remove non-english words 
5. Plotting image (draw box on image based on captured coordinate points (x,y))
6. Export the clean data to csv/db3 file

UI: Report
1. Pie chart to depicts the classification 
2. Accuracy chart
3. Grid to depict details - image name, captured text, form type

'''


def resize_image(image):
    """
    This function take one argument.
    It will resize the image - increase, decrease based on the input image size.
    Increase size : width < 1000
    Decrease size : width > 1000
    :param image:
    :return:
    """
    # Original image size
    (height, width) = image.shape

    # Resize the image
    if width > 1000:
        resized_image = cv2.resize(image, None, fx=0.6, fy=0.6)
    else:
        resized_image = cv2.resize(image, None, fx=1.6, fy=1.6)

    # (new_height, new_width) = resized_image.shape

    # print("\n")
    # print("Orig width={}, Orig height={}".format(width, height))
    # print("Resized width={}, Resized height={}".format(new_width, new_height))

    # cv2.imshow('resized image', resized_image)
    # cv2.waitKey()

    return resized_image


def slice_image(image):
    """
    This function take one argument.
    It will slice the image to the given range.
    Height: 5%-20%,
    Width: 10%
    :param image:
    :return sliced_image:

    """
    rz_image = resize_image(image)

    # new image size
    (new_height, new_width) = rz_image.shape

    # 3% height
    startY = int(0.03 * new_height)

    # 60% height
    endY = int(20 * startY)

    # 10% width
    startX = int(0.05 * new_width)

    endX = int(new_width - startX)

    sliced_image = rz_image[startY:endY, startX:endX]

    # cv2.imshow('sliced image', sliced_image)
    # cv2.waitKey()

    return sliced_image


def threshold_image(image):
    """
    This function take one argument.
    It will convert the input image to gray image
    and then converted to binary image (black & white)
    Pixel range: 0(white) to 255 (white)
    :param image:
    :return thresholds_image:
    """
    # Convert image to grayscale
    # gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Convert image to black and white (binary image)
    thresholds_image = 255 - cv2.threshold(image, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]

    return thresholds_image


def extract_text(image):
    """
    This function take one argument.
    It will extract the text from the given input image
    by OCR engine.
    Set PSM (page segmentation modes) to 6. Assume a single uniform block of text.
    :param image:
    :return:extract_details
    """

    # config = '--psm 6'
    # ext_text = pytesseract.image_to_string(image, lang='eng', config=config)

    config = r'--oem 3 --psm 6'

    # Feed image to tesseracts
    extract_details = pytesseract.image_to_data(image,
                                                output_type=pytesseract.Output.DICT,
                                                config=config, lang='eng')

    return extract_details


def parse_extract_details(extract_details):
    """
    This function take one argument.
    It will do cleanup by removing words that has < 4 length size
    and non-alphabet strings
    :param extract_details:
    :return clean_list:
    """
    # details_list = extract_text(image)
    clean_list = []

    for item in extract_details:
        if len(item) > 4:
            clean_list.append(item)

    # using search() to get only those strings with alphabets.
    clean_list = list(filter(lambda ele: re.search(r'[^a-zA-Z-.:\s]', ele) is None, clean_list))

    return clean_list


def natural_language_cleanup(parse_list):
    """
    This function take one argument.
    It removes the non-english words from the text
    Uses NLTK (natural language tool kit.
    :param parse_list:
    :return sentence:
    """

    words = set(nltk.corpus.words.words())
    text = ' '.join(parse_list)
    text = truecase.get_true_case(text)

    sentence = " ".join(w for w in nltk.wordpunct_tokenize(text) if w.lower() in words or not w.isalpha())

    return sentence


def write_text(formatted_text):
    """
    This function take one argument.
    it will write arranged text into
    a file.
    :param formatted_text: list
    :return: None
    """

    with open(r'output\result.csv', 'w', newline="") as file:
        csv.writer(file, delimiter=" ").writerows(formatted_text)


def draw_box(draw_image, extracted_details, image_name):
    """
    This function takes three arguments as input.
    It draw box around text area and saves it local directory
    :param draw_image: image
    :param extracted_details: dictionary
    :param image_name: string
    :return: None
    """
    # (B, G, R) tuple - # Blue color in BGR
    draw_color = (0, 255, 0)

    # Line thickness of 2 px
    thickness = 2

    # defining threshold for draw box
    accuracy_threshold = 30

    # draw the boxes
    total_boxes = len(extracted_details['text'])
    for sequence_number in range(total_boxes):
        if int(extracted_details['conf'][sequence_number]) > accuracy_threshold:
            (x, y, w, h) = (extracted_details['left'][sequence_number], extracted_details['top'][sequence_number],
                            extracted_details['width'][sequence_number], extracted_details['height'][sequence_number])
            box_image = cv2.rectangle(draw_image, (x, y), (x + w, y + h), draw_color, thickness)

            path = r'D:\Users\nlama\PycharmProjects\FirstProject\box_images'
            cv2.imwrite(os.path.join(path, image_name), box_image)

            # cv2.imshow('box image', box_image)
            # cv2.waitKey()


"""
## Start point to initiate the form classification process:
"""
if __name__ == "__main__":
    while 1 == 1:
        count = 1
        for job in get('http://localhost:8000/api/jobs?status=created', 'Job'):
            patch('http://localhost:8000/api/jobs/{0}'.format(job.jobID), JobUpdate('INPROGRESS').to_dict())
            form_geturl = 'http://localhost:8000/api/jobs/{0}/forms'.format(job.jobID)
            for form in get(form_geturl, 'Form'):
                file_name = form.name
                start_time = time.time()
                orig_image = cv2.imread(file_name, 2)	# reading images from local directory
                sl_image = slice_image(orig_image)	# rs_image = resize_image(orig_image)
                extract = extract_text(sl_image)	# th_image = threshold_image(sl_image)
                draw_box(sl_image, extract, file_name)
                parsed_text = parse_extract_details(extract['text'])
                clean_text = natural_language_cleanup(parsed_text)
                end_time = time.time()
                process_time = round(end_time - start_time, 2)
                start_date = datetime.datetime.now()
                form_type = classify([clean_text])
                patch('http://localhost:8000/api/forms/{0}'.format(form.id), FormUpdate(extract_text=clean_text,
                                                                                        process_time=process_time,
                                                                                        form_type=form_type).to_dict())
                count = count + 1
                print('END FOR 2')
            patch('http://localhost:8000/api/jobs/{0}'.format(job.jobID), JobUpdate('COMPLETED').to_dict())
            print('END FOR 1')
        print('END WHILE')

# display image
# cv2.imshow('captured text', box_image)
