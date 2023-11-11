console.log("script charger");

const URL="https://api.jsonbin.io/v3/"
const API_KEY = '$2a$10$xKWiKj9TSsybUfnpPg87Ouv9o1lkVLt.0TBBDfOUcVCoDSPCWKQV2';

const json = [{ sample: 'Hello World' }];
const json1 = { nom: 'papa' };
let collectionRecord=""
let records=[];
// const response = await postCreateBin(json);

let collection ;
let collectionBins;
let numberBins;
getReadCollection()

  

            //######################################################################################
            //pour créer un bins et mettre les premieres valeurs si pas de bins ds la collection
            //######################################################################################

    async function postCreateBin(json,collectionRecord) {
    const req = await fetch(`${URL}`+"b", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY,
        'X-Bin-Name' : 'cours-exo',
         'X-Collection-Id' :collectionRecord,
      },
      body: JSON.stringify(json),
    });
  
    const jsonResponse = await req.json();
  
    return jsonResponse;
  
}

            //######################################################################################
            //pour lire la collection et récupéré la collection id
            //######################################################################################
  async function getReadCollection() {
      const response = await fetch(`${URL}c`, {
        method: "GET",
        headers: {
          'X-Master-Key': API_KEY,
        },
      });
  
       collection = await response.json();
   //   console.log("Data:", collection);
      collectionRecord = collection.map(record=>record.record)[0];
    //   console.log("collectionRecord",collectionRecord)
    // const responseCreateBins = await postCreateBin(json,collectionRecord);
      getFindBins(collectionRecord);
      
      return collection;
  }

            //######################################################################################
            //pour rechercher le bins de la collection et récupérer le bins id
            //######################################################################################


async function getFindBins(collectionRecord){
   
        const response1 =await fetch(`${URL}c/${collectionRecord}/bins`,{
            method :"GET",
            headers:{
                'X-Master-Key':API_KEY,
            },
        });
        // console.log("response1:",response1);
        // console.log("srdtgh ",collectionRecord)
        collectionBins=await response1.json();

        if (collectionBins.length===0){
            console.log("nullllllllllllllllllllllllllll")
          
           postCreateBin(json,collectionRecord);
            getReadCollection();
            
        }else{
            console.log("collection bins :" ,collectionBins);
        
            numberBins = collectionBins.map(bin=>bin.record);
            console.log("number : "+numberBins);
            getReadBins(numberBins)
            return collectionBins;
        }
}

            //######################################################################################
            //pour lire le bins suivant l id et récupérer les donnée
            //######################################################################################


async function getReadBins(numberBins) {
  
    const response = await fetch(`${URL}b/${numberBins}`, {
      headers: {
        'X-Master-Key': API_KEY,
      },
    });

      const readCollectionBins = await response.json();
        records = readCollectionBins.record;
        console.log("Tableau : ", records);
        
        return readCollectionBins;
  }

let supprElement=document.getElementById("suppr");
supprElement.addEventListener("click",function () {
  suppr(numberBins);
  console.log("cliquer")
    
})

            //######################################################################################
            //pour supprimer le bins
            //######################################################################################

async function suppr(numberBins) {
    const req = await fetch(`${URL}b/${numberBins}`,{
       method:'DELETE',
       headers:{
           'X-Master-Key': API_KEY,
       }
    })
}


            //######################################################################################
            //pour ajouter des données dans le bins
            //######################################################################################

let ajoutElement=document.getElementById("ajout");
ajoutElement.addEventListener("click",function(){
   records.push(json1);
    console.log("records : ",records);
    getAjoutBins(numberBins,records);
})

async function getAjoutBins(numberBins,records) {
   
    const req = await fetch(`${URL}b/${numberBins}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': API_KEY,
        },
        
        body: JSON.stringify(records),
      });
    
      const jsonResponse = await req.json();
      return jsonResponse;
}
  
 


 
  