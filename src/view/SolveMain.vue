<template>
  <h1>{{ cho_hangul(naverMovie.title) }}</h1>
  <input type="text" @keyup.enter="input_answer" />
  <ul>
    <li v-for="(answer, key) in answers" :key="key">{{ answer }}</li>
  </ul>
  <teleport to="#extra-modal" v-if="openModal">
    <div class="wrapper-modal">
      <img :src="naverMovie.image" />
      <h2>{{ naverMovie.title }}</h2>
      <!-- <p>개요: {{ movie.genre }} | {{ movie.nation }} | {{ movie.runtime }}분</p> -->
      <p>개봉: {{ naverMovie.pubDate }}</p>
      <p>
        감독 :
        {{ naverMovie.director.substring(0, naverMovie.director.length - 1) }}
      </p>
      <p>
        출연 : {{ naverMovie.actor.substring(0, naverMovie.actor.length - 1) }}
      </p>
      <p>평점 : {{ naverMovie.userRating }}</p>
    </div>

    <button>다시하기</button>
  </teleport>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

export interface Movie {
  movieSeq: string;
  title: string;
  titleEng: string;
  directorNm: string;
  actorNm: string;
  nation: string;
  prodYear: number;
  plot: string; //줄거리
  runtime: number;
  rating: string;
  genre: string;
  posterUrl: string;
}

interface NaverMovie {
  actor: string;
  director: string;
  image: string;
  link: string;
  pubDate: string;
  subtitle: string;
  title: string;
  userRating: string;
}

const naverMovie = ref({} as NaverMovie);

const xNaverClientId = "X7pi8UDeTPYx5Vrpl69z";
const xNaverClientSecret = "9wwf2h7xxI";
fetch("/v1/search/movie.json?query=리틀 포레스트&country=KR", {
  headers: {
    "X-Naver-Client-Id": xNaverClientId,
    "X-Naver-Client-Secret": xNaverClientSecret,
  },
})
  .then((response) => response.json())
  .then((json) => (naverMovie.value = json.items[0]));

const answers = ref([] as string[]);
const openModal = ref(false);

const input_answer = (e: KeyboardEvent) => {
  const inputElement = e.target as HTMLInputElement;

  if (inputElement.value) {
    if (inputElement.value == naverMovie.value.title) {
      console.log("정답!", inputElement.value);
      openModal.value = true;
    } else {
      answers.value.unshift(inputElement.value); //맨 앞에 추가
      inputElement.value = "";
    }
  }
};

const cho_hangul = (str: string) => {
  if (!str) {
    return null;
  }

  const cho = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];

  //naverapi 에서 제목에 bold를 붙여서 보내주고있으므로 1차 가공한다.
  let result = "";

  str = str.replaceAll("<b>", "").replaceAll("</b>", "");
  naverMovie.value.title = str;

  for (let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i) - 44032;
    if (code > -1 && code < 11172) {
      result += cho[Math.floor(code / 588)];
    } else {
      result += str.charAt(i);
    }
  }
  return result;
};
</script>

<style></style>
