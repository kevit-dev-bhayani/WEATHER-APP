console.log("loded");

const weatherForm = document.querySelector("form");
const address = document.getElementById("input");
const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");

weatherForm.addEventListener("click", (e) => {
  e.preventDefault();
  
  p1.textContent = "loading";

  fetch(`https://weather-app-dev-bhayani.onrender.com/weather?address=${address.value}`).then(
    (res) => {
      console.log(res)

      res.json().then((data) => {
        if(data.hasOwnProperty('error')){
          p1.innerText=data.error
        }
        else{
          
          p2.textContent = data.location;
          p1.innerHTML = data.data;
        }
        console.log(data)
      });
    }
  ).catch(()=>{
    p1.innerText="No internet connection"
  });
});

