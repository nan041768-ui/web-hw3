// web-hw2_sortBy : 배열, 키 이름, 내림차순 여부 (참/거짓)
function sortBy(list, key, desc) {
   return [...list].sort((a, b) => {
      const sign = desc ? -1 : 1;

      if (typeof a[key] === "string") {
         // 제목, 다른 글 ...: 가나다순
         return a[key].localeCompare(b[key]) * sign;
      } else {
         // 숫자: 평점, 관객수 ...
         return (a[key] - b[key]) * sign;
      }
   });
}

// web-hw2_search : 배열, 문자열 -> 새 배열
function search(list, keyword) {
   const kw = keyword.trim().toLowerCase(); // 검색어 다듬기 
   return list.filter(m => m.title.toLowerCase().includes(kw));
}

//12주차 _ posterUrl 부분-------------------------
function posterUrl(path, size) {
   return "https://image.tmdb.org/t/p/" + size + path;
}

//12주차 _ renderCards 부분-------------------------
function renderCards(list) {
   const board = document.querySelector(".board");
   board.innerHTML = "";
   for (const m of list) {
      const card = document.createElement("article");
      card.className = "card";
      if (m.rating >= 8) { card.classList.add("hot"); }
      card.innerHTML = `<img class="poster" src="${posterUrl(m.poster, "w342")}" alt = "${m.title} 포스터" >
      <span class="badge">${m.rating}</span> 
      
      <div class="info">     
      <h2>${m.title}</h2>     
      <p class="year">${m.year}</p>     
      <button class="like" type="button">♥</button>  
      </div>`;
      board.appendChild(card);
   }
   if (list.length === 0) { board.classList.add("is-empty"); } else { board.classList.remove("is-empty"); }
   document.querySelector("#count").textContent = list.length + "편";
}
