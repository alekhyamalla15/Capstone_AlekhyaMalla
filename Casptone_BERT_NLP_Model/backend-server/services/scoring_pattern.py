from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

sw = stopwords.words('english')


def get_sentence_similarity(input_sentence, reference_sentence):
    # tokenization
    input_sentence = word_tokenize(input_sentence)
    reference_sentence = word_tokenize(reference_sentence)
    # sw contains the list of stopwords
    l1, l2 = [], []

    # remove stop words from the string
    X_set = {w for w in input_sentence if not w in sw}
    Y_set = {w for w in reference_sentence if not w in sw}

    # form a set containing keywords of both strings
    rvector = X_set.union(Y_set)
    for w in rvector:
        if w in X_set:
            l1.append(1)  # create a vector
        else:
            l1.append(0)
        if w in Y_set:
            l2.append(1)
        else:
            l2.append(0)
    c = 0

    # cosine formula
    for i in range(len(rvector)):
        c += l1[i] * l2[i]
    cosine = c / float((sum(l1) * sum(l2)) ** 0.5)
    if cosine > 0.5:
        return True, cosine
    else:
        return False, cosine
