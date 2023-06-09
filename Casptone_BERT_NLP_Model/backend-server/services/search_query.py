from youtube_search import YoutubeSearch
from googlesearch import search


def search_for_youtube(query_token):
    # results = YoutubeSearch(query_token, max_results=10).to_json()
    # print(results)
    results = YoutubeSearch(query_token, max_results=10).to_dict()
    print(results)
    return results


def search_for_google(query_token):
    urls_list = []
    for url in search(query_token, tld="co.in", num=10, stop=10, pause=2):
        urls_list.append(url)
    return urls_list
