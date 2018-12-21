'use strict';
(function(){ 
	var url = 'https://restcountries.eu/rest/v2/name/';
	var countriesList = document.getElementById('countries');
	var template = document.getElementById("country-template").innerHTML;
	var data = [];
	document.getElementById('search').addEventListener('click', searchCountries);

	function searchCountries() {
    	var countryName = document.getElementById('country-name').value;
    	if(!countryName.length) countryName = 'Poland';
	}

	function searchCountries() {
	    var countryName = document.getElementById('country-name').value;
	    if(!countryName.length) countryName = 'Poland';
	    fetch(url + countryName)
	        .then(function(resp) {
        		return resp.json();	           
	        })
	        .then(showCountriesList);
	}

	function numberWithCommas(x) {
   		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	function showCountriesList(resp) {
  		countriesList.innerHTML = '';	
  		if(resp.status == 404) {
    		return "Wrong country";
    	} else {
	  		resp.forEach(function(item) {
	  			var countryPopulation = numberWithCommas(item.population);
	  			var landArea = numberWithCommas(item.area);
	  			var countryLanguages = []

	  			for(var i = 0; i < item.languages.length; i++) {
	  				countryLanguages.push(" " + item.languages[i].name );
	  			}
				data.push({ name: item.name, flag: item.flag, capital: item.capital, population: countryPopulation, area: landArea, currencyCode: item.currencies[0].code, currencyName: item.currencies[0].name, language: countryLanguages });

			});

			for (var i = 0; i < data.length; i++){
				Mustache.parse(template);
				countriesList.innerHTML += Mustache.render(template, data[i]);
			}

				data = [];
		}
	}
})(); 