from services.bert_question_answer import answer_question
from summarizer import Summarizer

model = Summarizer()


def get_summary_from_bert(input_content):
    """
    Name: get_summary_from_bert
    :param input_content - String
    :return summary String.
    """
    result = model(input_content, min_length=60)
    return ''.join(result)


def get_answer_for_question(question, content):
    generated_answer = answer_question(question, content)
    return generated_answer
