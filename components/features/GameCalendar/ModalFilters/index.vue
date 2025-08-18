<script setup lang="ts">
import {
  games,
  EtypesOfPlatformGame,
  typesOfPlatformGame,
  cities,
  webPlatforms,
  typesOfGenres,
  typesOfCompany,
  statusesOfGame,
} from "./demoData";
import RangeInput from "./RangeInput.vue";
// 	 type TFeaturesModalFilters = {

// 	}

defineOptions({
  name: "FeaturesModalFilters",
});

// FIXME: потом еще причесать по enum надо будет значения, добавить валидацию, логику пересечения по датам

const cost = ref([0, 0]);
const badges = ref<any[]>([
  { name: "test", count: 12 },
  { name: "asdad", count: 112 },
]);
const game = ref();
const countOfPeople = ref<number[]>([]);
const averageAge = ref<number[]>([]);
const countOfFree = ref<number>();
const dateOfGames = ref<string[]>([]);
const averageTimeOfGame = ref<number>();
const masterRating = ref<number>();
const typeOfAdventure = ref<string>(typesOfCompany[0]);
const typeOfPlatform = ref<string>(typesOfPlatformGame[0].id);
const places = ref<string[]>([]);
const platformes = ref<string[]>([]);
const genres = ref<string[]>([]);
const statusGame = ref<string>(statusesOfGame[0]);

// FIXME: почему модификаторы на инпутах v-model.number не работают - надо иным способом ограничить ввод значений
// FIXME: для каждого бэйджа фильтра свой цвет - для начала надо понять сколько категорий будет
// FIXME: создать логику для связи между выбранными фильтрами и бейджами
</script>
<template>
  <div>
    <FilterBadges v-model="badges" />
    <USeparator class="my-4" />
    <form class="FeaturesModalFilters">
      <div>
        <div class="mb-3 flex items-end justify-between">
          <span class="text-2xl"> Цена, р </span>
          <span class="font-semibold" v-show="cost[0] + cost[1] == 0"
            >Бесплатно</span
          >
        </div>
        <USlider :max="200" :step="5" v-model="cost" />
        <div class="mt-6 flex gap-3">
          <UInput type="numeric" v-model="cost[0]">
            <template #leading>
              <p class="text-muted text-sm">От:</p>
            </template>
          </UInput>
          <UInput type="numeric" v-model="cost[1]">
            <template #leading>
              <p class="text-muted text-sm">До:</p>
            </template>
          </UInput>
        </div>
        <div class="mt-3">
          <span class="block text-center text-xl"> Место игры</span>

          <USelectMenu
            multiple
            v-model="places"
            :items="cities"
            class="mt-2 w-full"
          />
        </div>
        <div class="mt-3">
          <span class="mb-2 block text-xl"> Игра </span>
          <USelectMenu
            :search-input="{ placeholder: 'Поиск...', variant: 'none' }"
            v-model="game"
            multiple
            :items="games"
            class="w-full"
            label-key="name"
            placeholder="Выберите игру"
          />
        </div>

        <RangeInput
          class="mt-3"
          v-model="countOfPeople"
          label="Количество людей"
        />

        <div class="mt-3">
          <span class="block text-xl"> Свободные места</span>

          <UInput
            class="mt-2 w-full pl-0"
            type="numeric"
            v-model="countOfFree"
            placeholder="кол-во мест"
          />
        </div>

        <RangeInput class="mt-3" v-model="averageAge" label="Возраст игроков" />

        <div class="mt-3">
          <RangeInput
            type="date"
            v-model="dateOfGames"
            label="Даты проведения игр"
          />

          <div class="mt-3">
            <span class="block text-xl"> Среднее время игры (примерно) </span>

            <UInput
              type="number"
              v-model="averageTimeOfGame"
              placeholder="в часах"
              class="mt-2 w-full"
            />
          </div>

          <div class="mt-3">
            <span class="block text-xl"> Рейтинг мастера </span>

            <UInput
              type="number"
              placeholder="От"
              v-model="masterRating"
              class="mt-2 w-full"
            />
          </div>

          <div class="mt-3">
            <div class="flex items-center justify-between">
              <span class="block text-xl"> Рейтинг Игроков </span>
              <UTooltip
                :delay-duration="0"
                text="Фильтр будет пропускать игры с включенным отбором по рейтингу"
              >
                <Icon name="lucide:info" class="text-2xl" />
              </UTooltip>
            </div>

            <UInput
              type="number"
              v-model="masterRating"
              class="mt-2 w-full"
              placeholder="От"
            />
          </div>

          <div class="mt-3">
            <div class="flex items-center justify-between">
              <span class="block text-xl"> Возраст игроков </span>
              <UTooltip
                :delay-duration="0"
                text="Фильтр будет пропускать игры с включенным отбором по возрасту"
              >
                <Icon name="lucide:info" class="text-2xl" />
              </UTooltip>
            </div>

            <UInput
              type="number"
              v-model="masterRating"
              class="mt-2 w-full"
              placeholder="От"
            />
          </div>

          <div class="mt-3">
            <span class="block text-xl"> Тип компании</span>

            <URadioGroup v-model="typeOfAdventure" :items="typesOfCompany" />
          </div>

          <div class="mt-3">
            <span class="block text-xl"> Тип ведения игры </span>

            <URadioGroup
              label-key="name"
              value-key="id"
              v-model="typeOfPlatform"
              :items="typesOfPlatformGame"
            />
          </div>

          <div
            class="mt-3"
            v-if="
              typeOfPlatform === typesOfPlatformGame[0].id ||
              typeOfPlatform === typesOfPlatformGame[1].id
            "
          >
            <span class="block text-xl"> Платформа </span>

            <USelectMenu
              multiple
              v-model="platformes"
              :items="webPlatforms"
              class="mt-2 w-full"
            />
          </div>

          <div class="mt-3">
            <span class="block text-xl"> Жанры </span>

            <USelectMenu
              v-model="genres"
              multiple
              :items="typesOfGenres"
              class="mt-2 w-full"
            />
          </div>

          <div class="mt-3">
            <span class="block text-xl"> Статус по подбору людей</span>

            <URadioGroup v-model="statusGame" :items="statusesOfGame" />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
