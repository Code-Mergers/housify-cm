# Housify
Property/House Buying & Selling website Using React in the front-end, Firebase as the database and Flask server for price prediction.

## Deployement
- Visit [deployed site](https://housify-codemergers.netlify.app/)
  
## Video Tutorial - 
- [Tutorial-1](https://www.youtube.com/watch?v=sWEcSv6vKzE&t=13s)

## How to use intelligent price prediction in the website - 
- Due to some problems while deployment, the flask server is not yet deployed, it has to be started in a localhost in your machine to use price prediction. We are working on the problem.
- To start the flask server in the backend, install anaconda navigator or conda environment for python in your favourite edtitor, if you dont use this then when you will try to start the server after installing the dependencies, it will show this error -<b>'ModuleNotFoundError: No module named 'sklearn.linear_model'</b>
- To get rid of this error, get inside the server folder - 'cd folder' and type this command - <b>conda install scikit-learn=0.20</b>
- After installation of the module, move inside the server folder - 'cd server' and install all the dependencies by typing - <b>pip install -r requirements.txt</b>
- After these Commands run python app.py in terminal, this will start your server at port 5000(Local Host). 
- Now go to the [deployed site](https://housify-codemergers.netlify.app/) and you can get predicted price for your property. 
- There was a problem with the CORS policy, we are working on it, so to enable CORS for your browser install [this](https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc#:~:text=Moesif%20Origin%20%26%20CORS%20Changer&text=This%20plugin%20allows%20you%20to%20send%20cross%2Ddomain%20requests.&text=This%20plugin%20allows%20you%20to%20send%20cross%2Ddomain%20requests%20directly,Allow%2DOrigin%20set%20to%20*.) extension.
- <b>Visit the video tutorial to know how the website works. - </b> 
  
## License
- Distributed under the MIT License. See `LICENSE` for more information.

## Contact
- [Send mail](mailto:codemergers.org@gmail.com) to code mergers.

#### Thank you for visiting :)
