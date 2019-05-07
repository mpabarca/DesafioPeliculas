window.main={

getMovies:()=>{
    let movieArray=['moon','harry_potter','magic','lord','women','planet','sakura','beauty','end','coco'];
    let numberRandom = Math.floor(Math.random() * 10); 
    let wordRandom = movieArray[numberRandom]
    let database='http://www.omdbapi.com/?s='+wordRandom+'&apikey=341223be&plot=full';
    
    fetch(database)
    .then((success) => success.json())
    .then((response)=> {
        let movies= response.Search;
        movies.map((element,i)=>{
            let idMovie = element.imdbID;
            document.getElementById('root').innerHTML+= `
            <div id='${idMovie}'>
                <div class="row">
                    <div class="col s12 m12">
                        <div class="card blue-grey darken-1">
                            <div class="row card-content white-text">
                                <a class="col s2 m2" onclick="window.main.getInfo('${idMovie}',0)"><i class="fas fa-film"></i></a>
                                <span class="card-title col s10 m10">${element.Title}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        })
    })
    .catch((error) => console.log(error));
    
},
getInfo:(idMovie,click)=>{

        let database= 'http://www.omdbapi.com/?i='+idMovie+'&plot=full&apikey=341223be';
        fetch(database)
        .then((success) => success.json())
        .then((response)=> {
            if (click===0){
                click=1;
                document.getElementById(idMovie).innerHTML= `
                <div id='${idMovie}'>
                    <div class="row">
                        <div class="col s12 m12">
                            <div class="card blue-grey darken-1">
                                <div class="row card-content white-text">
                                    <a class="col s2 m2" onclick="window.main.getInfo('${idMovie}',${click})"><i class="fas fa-film"></i></a>
                                    <span class="card-title col s10 m10">${response.Title}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s12 m12">
                            <div class="card blue-grey darken-1">
                                <img id="img-small" class="hide-on-large-only" src="${response.Poster}">
                                <div class="row card-content white-text">
                                    <img class="col m3 l3 hide-on-small-only" src="${response.Poster}">
                                    <div class="col s10 m9">
                                        <h4>${response.Title}</h4>
                                        <h5>Año: ${response.Year}</h5>
                                        <h5>Duracion: ${response.Runtime}</h5>
                                        <p>${response.Plot}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `}else if (click===1){
                    click=0;
                    document.getElementById(idMovie).innerHTML= `
                        <div id='${idMovie}'>
                            <div class="row">
                                <div class="col s12 m12">
                                    <div class="card blue-grey darken-1">
                                        <div class="row card-content white-text">
                                            <a class="col s2 m2" onclick="window.main.getInfo('${idMovie}',${click})"><i class="fas fa-film"></i></a>
                                            <span class="card-title col s10 m10">${response.Title}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
                }
        })
        .catch((error) => console.log(error));

}
}
