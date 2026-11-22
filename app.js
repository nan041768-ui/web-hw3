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

      // (나) 카드별 종류·제목 이름
      card.setAttribute("data-type", m.type);
      card.setAttribute("data-title", m.title);

      // (다) 박스오피스 카드에만 순위 배지
      const rankHtml = m.type === "boxoffice" ? `<span class="rank">${m.rank}</span>` : "";

      // (라) 포스터 null 확인/ 대체 표지
      let posterHtml = "";
      if (m.poster === null) {
         card.classList.add("no-poster");
         posterHtml = `<div class="poster-fallback">${m.title[0]}</div>`;
      } else {
         posterHtml = `<img class="poster" src="${posterUrl(m.poster, "w342")}" alt="${m.title} 포스터">`;
      }

      // (가) 제목 태그 h3
      card.innerHTML = `
         ${posterHtml}
         ${rankHtml}
         <span class="badge">${m.rating}</span>
         <div class="info">
            <h3>${m.title}</h3>
            <p class="year">${m.year}</p>
            <button class="like" type="button">♥</button>
         </div>`;
      board.appendChild(card);
   }
   if (list.length === 0) {
      board.classList.add("is-empty");
   } else {
      board.classList.remove("is-empty");
   }
   document.querySelector("#count").textContent = list.length + "편";
}




// getView : 없음 -> 검색·필터·정렬 완료 영화 배열
function getView() {
   const keyword = document.querySelector("#q").value;
   const type = document.querySelector('input[name="type"]:checked').value;
   const sortKey = document.querySelector("#sort").value;

   // 1. 검색
   let result = search(movies, keyword);

   // 2. 보기 필터
   if (type !== "all") {
      result = result.filter(m => m.type === type);
   }

   // 3. 정렬
   return sortBy(result, sortKey, sortKey !== "title");
}

function refresh() { 
   renderCards(getView()); 
}


refresh();

// 리스너 3개
document.querySelector("#q").addEventListener("input", refresh);
document.querySelector("#sort").addEventListener("change", refresh);
document.querySelector("#typeFilter").addEventListener("change", refresh);
