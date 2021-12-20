async function getData(){
  

const stockValue=[];
const stockDate=[];
  const response = await fetch('stock');
  const json=await response.json();
  // console.log(json.data);
  const stockData=json.data;

 for (let index = stockData.length-1; index >0; index--) {
   const element = stockData[index];
   
//  console.log(element.date) 
    // console.log(element.date.slice(0,4));
    stockDate.push(element.date.slice(0,4));
    stockValue.push(element.value);
    // console.log(stockValue)


    
 }



const ctx = document.getElementById('myChart').getContext('2d');

const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: stockDate,
        datasets: [{
            label: 'GDP of the United States.',
            data:stockValue,
            backgroundColor: [
              '#00a375'
                
            ],
            borderColor: [
             ' #00a375'
               
            ],
            borderWidth: 4
        }]
    },
    options: {
      plugins: {
        legend: {
            display: true,
            labels: {
      font: {
        size: 20
    },
                color: '#033b04',
            }
        }
    },
   

      
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});




}

