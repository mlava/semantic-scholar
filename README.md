Access the scientific literature right within your Roam Research graph.

This extension allows you to get data from the 214 Million Papers, 2.49 Billion Citations and 79 Million Authors in the Semantic Scholar database.

There are a number of ways to access the data:
- Article title search
- Article Id search
- Author name search
- Author Id search
- Recommended articles using one article as the prompt
- Relevant articles for a search term

All six options can have Roam Research hotkeys enabled to make searching for new data as quick as a keystroke!

**Notes:**
- Please note that Semantic Scholar offers an API key by application, however this extension DOES NOT need an API key to work. Without an API key, Semantic Scholar limits calls to their API, and you might receive an error message that you are trying to import data too often. I have implemented a retry mechanism that will attempt up to ten times at ten second intervals, and will provide feedback about what is happening.
- You can apply for an API key at https://www.semanticscholar.org/product/api#api-key. If you are approved, you can enter the token in the Roam Depot settings for this extension, under the 'Set Here' or 'Home' tab.
- Rest assured that unless Semantic Scholar changes their access provisions, this extension will work without an API key.


To import a specific article, you can use IDs from Semantic Scholar (Corpus Id or Paper Id), DOI, Association for Computational Linguistics ID (ACL), arXiv ID, Microsoft Academic Graph ID (MAG), PubMed ID or PubMed Central ID. You can control which data is retrieved for an individual article by setting your preferences in the Roam Depot settings in the Article tab.

<img width="763" alt="image" src="https://github.com/user-attachments/assets/0c76a1d1-ed90-461d-a780-4a9096b89696">

You can decide what data you want to see for an article, and the order in which it is output. These options include Journal data, Article Type, Authors, References, Citations, Influential Citations, External Sources and Abstract.

If an article is Open Access and/or has an Open Access PDF, links to these sources will be displayed with the Article metadata.

Author metadata can be imported using the Semantic Scholar Author ID. Again, the data types you wish to retrieve for an author can be set in the Author tab in the Roam Depot settings.

<img width="696" alt="image" src="https://github.com/user-attachments/assets/f97bc9cd-65df-41cf-8ada-f79647c7507b">

You can also decide what data you want to see for an author, and the order in which it is output. These options include Affiliations, Home Page, Citation Count, h-Index and Publications.

You can choose to hide certain types of data from Article or Author import, and this will prevent that data being called from the Semantic Scholar API. This will reduce data transfer.

You can search for a paper by title, and Semantic Scholar will only return a single result. Of course, you can filter the search to limit to particular Fields of Study, years of publication, venue of publication, minimum citation count, Open Access status and the availability of an Open Access PDF.

<img width="833" alt="image" src="https://github.com/user-attachments/assets/02c64cf0-9e94-4951-8263-5bc8ace7b20f">

Or, search for an author by name and Semantic Scholar will return a list of authors. You can define how many you want to retrieve in the Author tab in settings.

<img width="616" alt="image" src="https://github.com/user-attachments/assets/aaba7f74-2ea2-43a7-afe8-823c566b45fb">

Semantic Scholar uses a machine learning algorithm to determine relationships between articles, and you can access this feature in two ways. The first is to search for articles using the Relevance Search feature. You can enter a search term and a variety of filters to find the most accurate results.

<img width="778" alt="image" src="https://github.com/user-attachments/assets/3ad6d658-dc0c-47b2-b8bc-810c3bfb8796">

Or, search for recommended articles related to a specific article using the article Paper Id from Semantic Scholar.

<img width="768" alt="image" src="https://github.com/user-attachments/assets/6b5f14a9-055a-47ad-ad80-51f91c4abf50">

You can define how many results to obtain for Recommended or Relevance searches in the appropriate tab in Roam Depot settings.

Semantic Scholar classifies their data using the following Fields of Study:
- Computer Science
- Medicine
- Chemistry
- Biology
- Materials Science
- Physics
- Geology
- Psychology
- Art
- History
- Geography
- Sociology
- Business
- Political Science
- Economics
- Philosophy
- Mathematics
- Engineering
- Environmental Science
- Agricultural and Food Sciences
- Education
- Law
- Linguistics

You can set your preferred Fields of Study in the Roam Depot settings for this extension as comma-separated list. e.g. Medicine,Biology,Business

The best features are enabled if you also have the SmartBlocks extension installed. When you install this extension, a new page will be created in your graph entitled 'Semantic Scholar Configuration'. This has all of the required SmartBlocks so that you won't need to create anything yourself.

When you import any data from Semantic Scholar, a SmartBlock button will be placed after all article titles, author names, and search results. You can click that SmartBlock button to import the data for that item to your graph as well. For lists of Recommended or Relevant Article searches, or Author Name searches, you will be presented with both Refresh and Import More SmartBlock buttons. If you import 5 authors, for example, the Import More button will import another five authors. Refresh will update the data if there has been new publications become available.
