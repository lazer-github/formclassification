import string
import pandas as pd
import spacy as spacy
import numpy as np
from spacy.lang.en.stop_words import STOP_WORDS
from spacy.lang.en import English
from sklearn.feature_extraction.text import CountVectorizer

# Create our list of punctuation marks
punctuations = string.punctuation

# Create our list of stopwords
# nlp = spacy.load('en')
stop_words = spacy.lang.en.stop_words.STOP_WORDS

# Load English tokenizer, tagger, parser, NER and word vectors
parser = English()

tags = pd.read_json("tags.json")
header_keys = tags["headerKey"]
keywords = tags["Keywords"]

text = ["Standard certificate death deceased state death certificate"
        " security birth birthplace berth other location death"]


# Creating our tokenizer function
def spacy_tokenizer(sentence):
    # Creating our token object, which is used to create documents with linguistic annotations.
    my_tokens = parser(sentence)

    # Lemmatizing each token and converting each token into lowercase
    my_tokens = [word.lemma_.lower().strip() if word.lemma_ != "-PRON-" else word.lower_ for word in my_tokens]

    # Removing stop words
    my_tokens = [word for word in my_tokens if word not in stop_words and word not in punctuations]

    # return preprocessed list of tokens
    return my_tokens


def count_vector(i, j, extracted_text, keys):
    vectorizer = CountVectorizer(tokenizer=spacy_tokenizer, ngram_range=(i, j))
    vectorizer.fit(extracted_text)
    new_vector = vectorizer.transform(keys)
    return new_vector.toarray()


def max_count(extracted_text):
    keys = np.array(count_vector(1, 1, extracted_text, keywords))
    keys_row_sum = np.sum(keys, axis=1)
    headers = np.array(count_vector(2, 2, extracted_text, header_keys))
    headers_row_sum = np.sum(headers, axis=1)
    tot_row_sum = keys_row_sum + (headers_row_sum * 10)
    return tags["tag"][np.argmax(tot_row_sum)]


def classify(extracted_text):
    return max_count(extracted_text)


def main():
    result = classify(text)
    print(result)


if __name__ == "__main__":
    main()

