
// JSON파일에 있는 item들을 받아온다.
function loadItems()
{
  // 브라우저 API
  // 경로를 지정해주면 해당 경로의 데이터를 받아온다.
  return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.items);
}

function displayItems(items)
{
  const container = document.querySelector('.items');
  // join : 받아온 문자열의 배열을 하나의 큰 문자열로 병합한다.
  container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

function createHTMLString(item)
{
  return `
    <li class="item">
      <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
      <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
  `;
}

function onButtonClick(event, items)
{
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;


  if (key == null || value == null)
  {
    return;
  }

  displayItems(items.filter(item => item[key] === value));
}

function setEventListeners(items)
{
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.buttons');
  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', event => onButtonClick(event, items));
}

// main
loadItems()
  .then(items => {
    // item들을 동적으로 불러와 promise가 리턴 되었을때
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log) // 제대로 불러오지 못했을때