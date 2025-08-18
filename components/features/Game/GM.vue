<script setup lang="ts">
const demoComments = [
  {
    avatar: "/images/wod_1.png",
    name: "Маркус",
    rating: 5,
    countOfGames: 74,
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, perferendis molestiae a rem exercitationem vitae corrupti minima ad fugiat labore repudiandae et, minus nostrum molestias recusandae eum hic aliquid asperiores.",
  },
  {
    avatar: "/images/wod_1.png",
    name: "Маркус",
    rating: 5,
    countOfGames: 74,
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, perferendis molestiae a rem exercitationem vitae corrupti minima ad fugiat labore repudiandae et, minus nostrum molestias recusandae eum hic aliquid asperiores.",
  },
  {
    avatar: "/images/wod_1.png",
    name: "Маркус",
    rating: 5,
    countOfGames: 74,
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, perferendis molestiae a rem exercitationem vitae corrupti minima ad fugiat labore repudiandae et, minus nostrum molestias recusandae eum hic aliquid asperiores.",
  },
];

defineOptions({
  name: "GameGM",
});
</script>
<template>
  <div class="GameGM">
    <ProfileHeader>
      <template #topPart>
        <Button
          class="absolute top-3 right-3 z-10 rounded-full p-2!"
          color="danger"
          icon="material-symbols:favorite"
          size="sm"
        />

        <Button
          class="absolute right-3 bottom-3 z-10 rounded-full p-2!"
          color="secondary"
          icon="ic:baseline-message"
          size="lg"
        />
      </template>
    </ProfileHeader>
    <USeparator class="py-2" color="primary" type="solid" />
    <div class="flex items-center justify-center gap-1 text-lg">
      <Icon class="text-lg" name="game-icons:dice-target" />
      <span>Водит 3 года</span>
    </div>
    <div class="flex items-center justify-center gap-1 text-lg">
      <Icon class="text-lg" name="game-icons:flying-flag" />
      <span> 11 сессий проведено </span>
    </div>
    <USeparator class="py-2" color="primary" type="solid" />
    <ul class="flex justify-center gap-2.5 text-white">
      <li>
        <NuxtLink
          class="flex items-center justify-center rounded-full bg-blue-700 p-1.5 text-2xl"
        >
          <Icon class="text-white" name="ic:baseline-discord" />
        </NuxtLink>
      </li>

      <li>
        <NuxtLink
          class="flex items-center justify-center rounded-full bg-blue-400 p-1.5 text-2xl"
        >
          <Icon class="text-white" name="ic:baseline-facebook" />
        </NuxtLink>
      </li>

      <li>
        <NuxtLink
          class="flex items-center justify-center rounded-full bg-blue-500 p-1.5 text-2xl"
        >
          <Icon class="text-white" name="ic:baseline-telegram" />
        </NuxtLink>
      </li>
    </ul>
    <USeparator class="py-2" color="primary" type="solid" />
    <section>
      <h2 class="text-xl font-semibold">Оценка и отзывы</h2>
      <div
        class="mt-2 flex items-center justify-center gap-1.5 text-xl font-semibold"
      >
        <Star />
        <!-- <Icon class="text-amber-300" name="material-symbols:star" /> -->
        <span> 5.0 (29) </span>
      </div>
      <UserComments :comments="demoComments">
        <template #additional>
          <Button class="my-4" color="info">Изучить все отзывы</Button>
        </template>
      </UserComments>
    </section>

    <ScrollArea class="h-100" @scrolledToBottom="handleScrollToBottom">
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus,
      fugiat provident ut ex nulla iure reiciendis veniam. Quo nulla deleniti
      iusto vero esse architecto optio cupiditate nam repellat iste earum
      voluptate temporibus reiciendis dolorum, laboriosam eius praesentium
      incidunt dolor? Magnam nisi accusamus facere obcaecati quidem. Aspernatur
      maxime eius unde commodi, excepturi et labore magni ea dicta
      necessitatibus saepe similique facere, minima animi molestiae quas dolor
      enim voluptatum, culpa reprehenderit? Ipsa quaerat, sit et eaque
      necessitatibus magni ad incidunt? Quae totam eligendi, laboriosam quo
      quaerat voluptatum, dolores vero asperiores pariatur maiores repudiandae
      nulla dolorem eaque facilis, laudantium nobis neque. Debitis voluptatum
      consequatur aperiam suscipit tempora molestias eius accusamus aliquid
      corporis. Eveniet nihil ipsa similique doloribus iusto tempora a. Dolorem
      ducimus temporibus vel possimus praesentium necessitatibus quod minima id
      sunt voluptas accusamus, ab sequi impedit dignissimos molestiae earum quia
      nihil neque ad aliquid sed! Ipsa asperiores nisi, quasi cum non dolore
      eveniet officia vitae veniam, possimus totam animi quibusdam aspernatur
      obcaecati nam laboriosam sit enim? Corrupti, unde facere! Eius cum
      voluptates aut dolorum possimus quis molestias exercitationem illo! Quos,
      unde, recusandae corrupti quaerat, iste itaque nulla magni minima incidunt
      nam iusto? Numquam libero enim corrupti nesciunt quibusdam repudiandae
      aliquid autem perspiciatis tenetur natus mollitia sit earum provident
      iusto ullam voluptatum, facere corporis vel consequatur odio vitae maiores
      quas deserunt? Quidem, accusamus fugit. Atque consequuntur iste iure
      suscipit harum dolore facilis quas sint ipsa pariatur distinctio sed eius
      aspernatur quae neque est aliquid nesciunt nam dignissimos explicabo,
      porro delectus! Illum perspiciatis id, optio minus fuga quas recusandae
      nisi? Quo quasi neque qui ullam corporis fugiat labore unde eos laborum
      expedita, tempora ad perferendis similique officia praesentium vero
      officiis. Debitis expedita aspernatur facere quidem, rem quam incidunt,
      sed quas ut ad blanditiis esse voluptate dicta in eius est, ea officia
      quaerat necessitatibus qui modi cupiditate. Dolores, voluptate ipsa nemo,
      soluta rem maiores corrupti nostrum sed animi tempora dolor asperiores,
      obcaecati eum ad? Doloremque culpa officiis facere cumque est, nemo quam
      asperiores nobis dolorum ex perspiciatis vel neque explicabo ipsam
      voluptatibus vitae cum optio at libero esse accusantium illo hic quidem.
      Explicabo nam, expedita tempora non illo voluptates fugiat vitae ex,
      numquam perspiciatis, placeat rerum sunt voluptatum ab ipsa. Aspernatur,
      similique facilis, magnam cupiditate exercitationem doloribus minus
      praesentium necessitatibus consectetur natus consequatur voluptates
      voluptatum voluptatibus suscipit quo est officiis. Voluptatum vero
      temporibus blanditiis. Dolores placeat accusantium ipsam optio quasi hic
      dignissimos delectus eveniet totam obcaecati numquam et reprehenderit
      nihil at eaque, dolore architecto earum! Odio quis perferendis cum ad,
      tempore deserunt ipsam distinctio amet suscipit sunt velit fugit voluptas
      saepe labore fuga totam quam, ea debitis impedit! Officia amet consequatur
      quidem, cum eaque tenetur, voluptatibus eligendi, illo similique sed nam
      tempore quisquam magnam vitae quibusdam ab fugit quo quas dignissimos
      maiores repellendus! A, odio repellendus. Consequuntur illo quaerat
      exercitationem! Doloribus, non fugiat eaque quis molestias quasi nam
      voluptatibus dicta voluptates, laudantium consequatur dolorem aperiam
      repellendus tempora reiciendis cumque. Facere vitae eveniet doloribus
      animi unde sunt deleniti delectus quidem error, rerum, totam quia quas
      sit. Ipsum, amet, vel nihil placeat quasi provident rem hic molestiae
      architecto tempora explicabo. Numquam soluta, sed voluptatibus culpa sint
      quasi beatae id consectetur perspiciatis placeat laborum explicabo
      commodi, ipsum officiis atque est ab neque. Ducimus velit illum cumque,
      magnam, fuga esse quo dicta excepturi quidem quasi voluptate sapiente!
      Eaque quidem laudantium libero, vitae fuga labore, temporibus sed nihil
      corrupti sequi numquam. Qui distinctio, quo doloribus aliquid odio vel,
      neque beatae expedita deserunt obcaecati, consequatur ullam dolorem?
      Consequuntur tenetur, libero quas eos veritatis ab. Sed ratione inventore
      asperiores optio pariatur veniam tenetur nulla ab, soluta harum
      voluptatum, deserunt ex, similique beatae nobis. Ratione sint
      reprehenderit placeat commodi saepe magnam minus laboriosam? Doloremque
      quidem nostrum obcaecati quam provident eligendi quas tempora impedit
      dolores esse cupiditate optio quisquam modi fuga iste, eius vero
      repellendus inventore omnis nisi eaque fugit repellat. Eum molestiae
      quisquam, itaque odio necessitatibus explicabo natus, consequuntur
      distinctio iusto labore quibusdam blanditiis, nihil fugit unde accusamus!
      Porro tempore cum molestiae eius iste quam. Deserunt corrupti eaque labore
      eveniet corporis voluptas porro reprehenderit ipsam ab omnis, harum itaque
      est molestiae laborum veniam dignissimos accusamus, natus in repellat sit
      incidunt. Ipsam consequatur, voluptatem quia similique eveniet excepturi
      blanditiis nulla nobis, illo non amet, provident reiciendis aut rem.
      Consequatur reiciendis quidem est nulla, illo sint hic laborum placeat,
      quod similique iusto expedita non iste atque nihil! Quas cum sed est,
      magnam nesciunt necessitatibus numquam dolorum beatae iste quia assumenda
      consectetur dicta asperiores! Voluptatum labore a pariatur eos? Commodi
      sit minus quia, laudantium illo itaque, adipisci fuga rem quae aperiam
      tempore quaerat! Numquam voluptate explicabo earum neque necessitatibus
      vitae similique harum maiores aliquam. Atque quo exercitationem quod id
      iste, ab consectetur dolor eligendi soluta reprehenderit expedita
      accusamus ad corrupti nulla doloremque, illo doloribus unde vero nam
      consequuntur, quaerat libero corporis rerum? Debitis pariatur modi nisi
      maxime voluptatibus fugiat ratione, alias eaque asperiores, harum totam
      dolorum culpa eos error ad quos aspernatur. Facere, nemo ipsam! Explicabo
      est sapiente tempora, assumenda minima excepturi sed fugit. Et nesciunt
      facere officiis, ipsum ut enim eum hic quo delectus illum consequuntur,
      obcaecati molestiae quod laudantium labore animi quidem assumenda. Soluta
      ullam, odio dolorum culpa laudantium provident, numquam maiores saepe
      maxime molestias sequi quibusdam quidem commodi esse odit deleniti minima
      iure veritatis totam quae assumenda? A ipsum laborum delectus, placeat
      aspernatur ex blanditiis distinctio corrupti vitae eveniet accusamus
      magnam rerum perspiciatis dicta sapiente ullam nemo repellendus reiciendis
      est eaque repudiandae et ea soluta nam. Veniam cumque quidem aut ipsum ad
      perferendis blanditiis aspernatur deserunt vitae nam, libero reiciendis
      inventore incidunt voluptas voluptatibus beatae. Adipisci totam error,
      maiores inventore dicta itaque voluptatem eligendi, magnam at voluptates
      ullam temporibus mollitia doloribus quo molestiae aut accusantium
      cupiditate ratione. Quibusdam voluptas cupiditate vero optio illo, maxime
      eveniet minima rerum deleniti ullam necessitatibus assumenda dolores
      explicabo accusantium in adipisci esse hic perferendis laborum reiciendis
      quia cumque ea debitis mollitia. Ducimus neque quas reprehenderit dolorum
      maxime porro sapiente ad. Quisquam tempora ullam aliquam nobis iure atque
      sint nam illum quas, accusamus aperiam hic adipisci est assumenda
      harum.</ScrollArea
    >
  </div>
</template>

<!--<style lang="scss"></style>-->
