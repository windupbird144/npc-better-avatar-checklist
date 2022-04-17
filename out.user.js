// ==UserScript==
// @name         Avatar/Stamps checklist
// @namespace    https://github.com/windupbird144/
// @version      0.3
// @description  Improve avatar/stamp collection pages 
// @author       github.com/windupbird144
// @include      https://neopetsclassic.com/collection/?category_id=22
// @include      https://neopetsclassic.com/neoboards/avatars/?username=*
// @grant        none
// @license      MIT
// ==/UserScript==
(() => {
  // src/shared.js
  function toRelativeUrl(s) {
    return s.replace(/https?:\/\/neopetsclassic.com/, "").replace("//", "/");
  }

  // src/stamps/index.js
  var isDone = (elem) => elem.style.filter === "";
  var icon = (bool) => bool ? "&check;" : "";
  var url = "/collection/?category_id=22";
  function handler() {
    const unmatched = [];
    const stamps = Array.from(document.querySelectorAll(".inventoryitem")).map((e) => {
      const img = e.children[0];
      const url3 = toRelativeUrl(img.src);
      let [name, rest] = img.title.split(" (r");
      let [rarity, description] = rest.split(") : ");
      name = name.trim();
      description = description.trim();
      rarity = parseInt(rarity, 10);
      let [done2, inventory, sdb, shop] = [0, 4, 5, 6].map((i) => e.children[i]).map(isDone);
      let images = Array.from(e.children).slice(4, 7).map((e2) => e2.outerHTML).join("");
      return { url: url3, name, rarity, description, done: done2, inventory, sdb, shop, images };
    });
    const form = document.querySelector(`form[action="/collection/"]`);
    form.parentElement.insertAdjacentElement("beforebegin", form.cloneNode(true));
    form.parentElement.removeChild(form.nextElementSibling);
    let table = document.querySelector("#center");
    table.parentElement.removeChild(table);
    const target = document.querySelector(".content");
    const total = stamps.length;
    const done = stamps.filter((e) => e.done).length;
    table = `<p>You own <b>${done}</b> out of <b>${total}</b> items in this category.</p>
    <table id="userscript-stamps">
        <thead>
            <tr>
                <td></td>
                <td>Name</td>
                <td>Rarity</td>
                <td>Seen</td>
                <td>Locations</td>
            </tr>
        </thead>
        <tbody>
        ${stamps.sort((a, b) => a.done > b.done ? 1 : b.done > a.done ? -1 : a.rarity - b.rarity).map((e) => `<tr>
                <td><img src="${e.url}" title="${e.name} (r${e.rarity}) : ${e.description}"/></td>
                <td>${e.name}</td>
                <td>${e.rarity}</td>
                <td>${icon(e.done)}</td>
                <td>${e.done ? e.images : ""}</td>
            </tr>`).join("")}
        </tbody>
    </table>
    <style>
    #userscript-stamps thead tr {
        background-color: #efedc0
    }
    #userscript-stamps thead td,
    #userscript-stamps thead td > img {
        padding-right: 1em;
    }    
    #userscript-stamps tbody tr:nth-of-type(even) {
        background-color: #ffffaa;
    }
    
    #userscript-stamps {
        border-collapse: collapse;
    }
    </style>`;
    target.insertAdjacentHTML("beforeend", table);
  }
  var stamps_default = {
    url,
    handler
  };

  // src/avatars/avatars.json
  var avatars_default = [
    {
      url: "/images/avatars/codestones.gif",
      avatar: "Codestones!",
      type: "Items",
      method: "Have one of each type codestone in your inventory (10 total).",
      retired: false
    },
    {
      url: "/images/avatars/kadoatery.gif",
      avatar: "Kadoatery - Mew!",
      type: "Other",
      method: "Feed 75 Kadoaties at the Kadoatery, and then check your user lookup.",
      retired: false
    },
    {
      url: "/images/avatars/128.gif",
      avatar: "Magical Kauvara",
      type: "Items",
      method: "Use any morphing potion on your pet. (transmogrification potions do not give this avatar)",
      retired: false
    },
    {
      url: "/images/avatars/74.gif",
      avatar: "Mutant JubJub",
      type: "Items",
      method: "Use any transmogrification potion on your pet. (morphing potions do not give this avatar)",
      retired: false
    },
    {
      url: "https://images.neopets.com/neoboards/avatars/brokentoy.gif",
      avatar: "Broken",
      type: "Other",
      method: "Repair something at Donny's Toy Repair Shop.",
      retired: false
    },
    {
      url: "/images/avatars/madaboutorange.gif",
      avatar: "Mad About Orange",
      type: "Items",
      method: 'Have 8 items with the word "orange" in its name in your inventory.',
      retired: false
    },
    {
      url: "/images/avatars/41.gif",
      avatar: "I'm Smelly",
      type: "Items",
      method: 'Have 10 items with the word "dung" in their name in your Inventory.',
      retired: false
    },
    {
      url: "/images/avatars/alienaisha.gif",
      avatar: "Alien Aisha",
      type: "Items",
      method: "Use a nerkmid at the Vending Machine.",
      retired: false
    },
    {
      url: "/images/avatars/205.gif",
      avatar: "Uni - Beauty",
      type: "Items",
      method: "Use any grooming item on your pet.",
      retired: false
    },
    {
      url: "/images/avatars/fyora.gif",
      avatar: "Fyora - Faerie Queen",
      type: "Items",
      method: "Purchase something at the Hidden Tower.",
      retired: false
    },
    {
      url: "/images/avatars/angelpuss.gif",
      avatar: "Angelpuss - Angel",
      type: "Other",
      method: "Search 'Angelpuss' in the search bar (Case Sensitive).",
      retired: false
    },
    {
      url: "/images/avatars/plushiecybunny.gif",
      avatar: "Cybunny - Plush",
      type: "Pet/Petpet",
      method: 'View a Plushie Cybunny with any plushie in your inventory.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Buns" title="Any plushie" target="new">Buns</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Macie" title="Any plushie" target="new">Macie</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=SnickleDumper" title="Any plushie" target="new">SnickleDumper</a>)',
      retired: false
    },
    {
      url: "/images/avatars/windyharris.gif",
      avatar: "Harris - Hi",
      type: "Pet/Petpet",
      method: "View your own pet's lookup that has a 99+-day-old Harris attatched to it.",
      retired: false
    },
    {
      url: "/images/avatars/starrygelert.gif",
      avatar: "Gelert - Starry",
      type: "Pet/Petpet",
      method: `View a Starry Gelert while you have an item in your inventory with the word "starry" in it.				<br><b>Pets: </b>
									(<a href="https://neopetsclassic.com/petlookup/?pet_name=rgjeorjworigjwoijg" title="'Starry' in name" target="new">rgjeorjworigjwoijg</a>)`,
      retired: false
    },
    {
      url: "/images/avatars/cracked.gif",
      avatar: "Baby Pteri - Cracked",
      type: "Clickables",
      method: 'Visit the pet lookup of a Baby Pteri.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Egg" title="" target="new">Egg</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Eggo" title="" target="new">Eggo</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Omelette" title="" target="new">Omelette</a>)',
      retired: false
    },
    {
      url: "/images/avatars/rainbowchomby.gif",
      avatar: "Chomby - Colourful",
      type: "Clickables",
      method: 'Visit the pet lookup of a Rainbow Chomby.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Layton" title="" target="new">Layton</a>)',
      retired: false
    },
    {
      url: "/images/avatars/darkpeophin.gif",
      avatar: "Darigan Peophin",
      type: "Clickables",
      method: 'Visit the lookup of a Darigan Peophin.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Wasteland" title="" target="new">Wasteland</a>)',
      retired: false
    },
    {
      url: "/images/avatars/grundo_faerie.gif",
      avatar: "Grundo - Faerie",
      type: "Clickables",
      method: 'Visit the pet lookup of a Faerie Grundo.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Curacao" title="" target="new">Curacao</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Ganymede" title="" target="new">Ganymede</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Kosmos" title="" target="new">Kosmos</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=lilDipper" title="" target="new">lilDipper</a>)',
      retired: false
    },
    {
      url: "/images/avatars/clay_day.gif",
      avatar: "Clay - Ouch!",
      type: "Clickables",
      method: 'Visit the pet lookup of a Clay pet.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Clay" title="" target="new">Clay</a>)',
      retired: false
    },
    {
      url: "/images/avatars/bahbyjetsam.gif",
      avatar: "Jetsam - Bah!",
      type: "Clickables",
      method: 'Visit the pet lookup of a Baby Jetsam.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Grisu" title="" target="new">Grisu</a>)',
      retired: false
    },
    {
      url: "/images/avatars/tyrannianjubjub.gif",
      avatar: "Jubjub - Tyrannian",
      type: "Clickables",
      method: 'Visit the pet lookup of a Tyrannian Jubjub.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Bonehead" title="" target="new">Bonehead</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=uh" title="" target="new">uh</a>)',
      retired: false
    },
    {
      url: "/images/avatars/plushieeyrie.gif",
      avatar: "Plushie Eyrie",
      type: "Other",
      method: "Post 'squawk' on any neoboard topic.",
      retired: false
    },
    {
      url: "/images/avatars/discoixi.gif",
      avatar: "Ixi - Disco",
      type: "Clickables",
      method: 'Visit the pet lookup of a Disco Ixi.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Tummler" title="" target="new">Tummler</a>)',
      retired: false
    },
    {
      url: "/images/avatars/yarrble.gif",
      avatar: "Yarrble!",
      type: "Clickables",
      method: 'Visit the pet lookup of a Pirate Yurble.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Scar" title="" target="new">Scar</a>)',
      retired: false
    },
    {
      url: "/images/avatars/discoaisha.gif",
      avatar: "Aisha - Disco",
      type: "Clickables",
      method: 'Visit the pet lookup of a 100+ day old Disco Aisha.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=hip" title="" target="new">hip</a>)',
      retired: false
    },
    {
      url: "/images/avatars/toughflotsam.gif",
      avatar: "Flotsam - Tough!",
      type: "Clickables",
      method: 'Visit the pet lookup of a Flotsam with strength of 55 points or more. (if you know one, nm mandanarchi to get it added!)				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Wave" title="" target="new">Wave</a>)',
      retired: false
    },
    {
      url: "/images/avatars/sloth.gif",
      avatar: "Sloth!",
      type: "Other",
      method: "Random Event",
      retired: false
    },
    {
      url: "/images/avatars/toothfaerie.gif",
      avatar: "Tooth Faerie",
      type: "Other",
      method: "Awarded in a Tooth Faerie random event while browsing the site.",
      retired: false
    },
    {
      url: "/images/avatars/wheelofexcitement.gif",
      avatar: "Wheel of Excitement",
      type: "Games",
      method: "Awarded when winning 10k from the Wheel of Excitement.",
      retired: false
    },
    {
      url: "/images/avatars/snowwocky.gif",
      avatar: "Wocky - Snow Day",
      type: "Pet/Petpet",
      method: "View the pet lookup of your own Snow pet that is 100+ days old.",
      retired: false
    },
    {
      url: "/images/avatars/werelupe.gif",
      avatar: "Werelupe",
      type: "Pet/Petpet",
      method: "View the pet lookup of your own Halloween Lupe.",
      retired: false
    },
    {
      url: "/images/avatars/rainbowflotsam.gif",
      avatar: "Flotsam - Rainbow",
      type: "Clickables",
      method: 'Visit the pet lookup of a Rainbow Flotsam.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Wave" title="" target="new">Wave</a>)',
      retired: false
    },
    {
      url: "/images/avatars/sigh.gif",
      avatar: "Grey Wocky - *sigh*",
      type: "Pet/Petpet",
      method: "View the pet lookup of your own Grey-colored pet. (You can adopt &amp; re-pound pet name PlsRepoundMe_GreyAvvie)",
      retired: false
    },
    {
      url: "/images/avatars/spottedtuskaninny.gif",
      avatar: "Tuskaninny - Spotted",
      type: "Items",
      method: 'Have an item in your inventory with the word "spotted" in its name and visit the lookup of your own Tuskaninny. (Lesser Spotted Fish is a cheap item)',
      retired: false
    },
    {
      url: "/images/avatars/royalboyacara.gif",
      avatar: "Acara - Angry Prince",
      type: "Clickables",
      method: 'Visit the pet lookup of a Royalboy Acara.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Duh" title="" target="new">Duh</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Fool" title="" target="new">Fool</a>)',
      retired: false
    },
    {
      url: "/images/avatars/faeriepteri.gif",
      avatar: "Faerie Pteri",
      type: "Clickables",
      method: 'Visit the pet lookup of a Faerie Pteri.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Ho-oh" title="" target="new">Ho-oh</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Plumed" title="" target="new">Plumed</a>)',
      retired: false
    },
    {
      url: "/images/avatars/babybuzz.gif",
      avatar: "Baby Buzz",
      type: "Other",
      method: "Type the phrase 'i love baby buzz!' into the Neopets search bar. (Case Sensitive)",
      retired: false
    },
    {
      url: "/images/avatars/babykougra.gif",
      avatar: "Kougra - Baby",
      type: "Clickables",
      method: 'Visit the pet lookup of a Baby Kougra younger than 60 days.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=BabyKoug" title="" target="new">BabyKoug</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Oolu" title="" target="new">Oolu</a>)',
      retired: false
    },
    {
      url: "/images/avatars/itsalive.gif",
      avatar: "Faellie - It's Alive!",
      type: "Clickables",
      method: 'Visit the pet lookup of a Neopet with a Faellie attached.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Popcake" title="" target="new">Popcake</a>)',
      retired: false
    },
    {
      url: "/images/avatars/darigangrarrl.gif",
      avatar: "Grarrl - Darigan",
      type: "Clickables",
      method: 'Visit the pet lookup of a Darigan Grarrl.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Sword" title="" target="new">Sword</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Tyrannomon" title="" target="new">Tyrannomon</a>)',
      retired: false
    },
    {
      url: "/images/avatars/starrykau.gif",
      avatar: "Kau - Starry",
      type: "Clickables",
      method: 'Visit the pet lookup of a Starry Kau.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Kauvara" title="" target="new">Kauvara</a>)',
      retired: false
    },
    {
      url: "/images/avatars/maraquankrawk.gif",
      avatar: "Maraquan Krawk",
      type: "Clickables",
      method: 'Visit the pet lookup of a Maraquan Krawk.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Drip" title="" target="new">Drip</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Tide" title="" target="new">Tide</a>)',
      retired: false
    },
    {
      url: "/images/avatars/fierypteri.gif",
      avatar: "Fiery Pteri",
      type: "Clickables",
      method: 'Visit the pet lookup of a Fire Pteri.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Magma" title="" target="new">Magma</a>)',
      retired: false
    },
    {
      url: "/images/avatars/krawkislandfever.gif",
      avatar: "Krawk - Island Fever",
      type: "Clickables",
      method: 'Visit the pet lookup of an Island Krawk with a 60+ day old island petpet attached to it.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Lilli" title="" target="new">Lilli</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Test" title="" target="new">Test</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Thousand" title="" target="new">Thousand</a>)',
      retired: false
    },
    {
      url: "/images/avatars/foreverorange.gif",
      avatar: "Grundo - Forever Orange",
      type: "Pet/Petpet",
      method: "View the pet lookup of your own Orange Grundo. (You can adopt &amp; re-pound pet name RePoundMeForAvatar)",
      retired: false
    },
    {
      url: "/images/avatars/icehissi.gif",
      avatar: "Hissi - Ice",
      type: "Clickables",
      method: 'Visit the pet lookup of an Ice Hissi.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Laufeyson" title="" target="new">Laufeyson</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Pikko" title="" target="new">Pikko</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Tomorrow" title="" target="new">Tomorrow</a>)',
      retired: false
    },
    {
      url: "/images/avatars/maraquanchomby.gif",
      avatar: "Maraquan Chomby",
      type: "Clickables",
      method: 'Visit the pet lookup of a Maraquan Chomby				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Yoshi" title="" target="new">Yoshi</a>)',
      retired: false
    },
    {
      url: "/images/avatars/islandquiggle.gif",
      avatar: "Island Quiggle",
      type: "Pet/Petpet",
      method: "View the pet lookup of your own Island Quiggle (You can adopt &amp; re-pound pet name GetTheAvatarAndPoundMe)",
      retired: false
    },
    {
      url: "/images/avatars/goldy.gif",
      avatar: "Goldy",
      type: "Clickables",
      method: 'Visit the pet lookup of a Neopet with a Goldy or Retro Goldy attached.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Pond" title="" target="new">Pond</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Sauvignon" title="" target="new">Sauvignon</a>)',
      retired: false
    },
    {
      url: "/images/avatars/kioskwocky.gif",
      avatar: "Kiosk Wocky",
      type: "Games",
      method: "Random when winning a prize; guaranteed if win the jackpot",
      retired: false
    },
    {
      url: "/images/avatars/mutantbruce.gif",
      avatar: "Bruce - Mutant",
      type: "Clickables",
      method: 'Visit the pet lookup of a Mutant Bruce that is older than 365 days.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=TheresaBugOnMyWall" title="" target="new">TheresaBugOnMyWall</a>)',
      retired: false
    },
    {
      url: "/images/avatars/grumpybori.gif",
      avatar: "Bori - Grumpy",
      type: "Clickables",
      method: 'Visit the pet lookup of a Plushie Bori with 0 HP or a disease.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Annabelle" title="" target="new">Annabelle</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Liebe" title="" target="new">Liebe</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Paprika" title="" target="new">Paprika</a>)',
      retired: false
    },
    {
      url: "/images/avatars/niptor.gif",
      avatar: "Niptor",
      type: "Clickables",
      method: 'Visit the lookup of a Neopet with a 50+ day old Niptor attached to it.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Prehistoric" title="" target="new">Prehistoric</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Spino" title="" target="new">Spino</a>)',
      retired: false
    },
    {
      url: "/images/avatars/villainousmeerca.gif",
      avatar: "Meerca - Halloween",
      type: "Clickables",
      method: 'Visit the pet lookup of a Halloween Meerca that has a petpet attached.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Deathwish" title="" target="new">Deathwish</a>)',
      retired: false
    },
    {
      url: "/images/avatars/piratemoehog.gif",
      avatar: "Moehog - Avast!",
      type: "Clickables",
      method: 'Visit the pet lookup of a Pirate Moehog.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Booty" title="" target="new">Booty</a>)',
      retired: false
    },
    {
      url: "/images/avatars/desertruki.gif",
      avatar: "Ruki - Desert",
      type: "Clickables",
      method: 'Visit the pet lookup of a Desert Ruki.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Khepri" title="" target="new">Khepri</a>)',
      retired: false
    },
    {
      url: "/images/avatars/mutantdraik.gif",
      avatar: "Mutant Draik - Back Off!",
      type: "Clickables",
      method: 'Visit the pet lookup of a Mutant Draik.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Elvarg" title="" target="new">Elvarg</a>)',
      retired: false
    },
    {
      url: "/images/avatars/camowocky.gif",
      avatar: "Wocky - Camouflage",
      type: "Clickables",
      method: 'Visit the pet lookup of any Camouflage Pet.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Camouflage" title="" target="new">Camouflage</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Jolteon" title="" target="new">Jolteon</a>)',
      retired: false
    },
    {
      url: "/images/avatars/mutantquiggle.gif",
      avatar: "Quiggle - Mutant",
      type: "Clickables",
      method: 'Visit the pet lookup of a Mutant Quiggle.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Chonker" title="" target="new">Chonker</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=MutantTea" title="" target="new">MutantTea</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Sac" title="" target="new">Sac</a>)',
      retired: false
    },
    {
      url: "/images/avatars/purplepeo.gif",
      avatar: "Peophin - Purple",
      type: "Clickables",
      method: 'Visit the pet lookup of a Purple Peophin. (This pet also awards the Spardel avatar)				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Amaranthine" title="" target="new">Amaranthine</a>)',
      retired: false
    },
    {
      url: "/images/avatars/faeriepeo.gif",
      avatar: "Peophin - Faerie",
      type: "Clickables",
      method: 'Visit the pet lookup of a Faerie Peophin.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Madeleine" title="" target="new">Madeleine</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Rarity" title="" target="new">Rarity</a>)',
      retired: false
    },
    {
      url: "/images/avatars/ohemgee.gif",
      avatar: "OHEMGEE!!!",
      type: "Clickables",
      method: 'Visit the pet lookup of a Royalgirl Bruce.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Eleanor" title="" target="new">Eleanor</a>)',
      retired: false
    },
    {
      url: "/images/avatars/mutanttonu.gif",
      avatar: "Tonu - Mutant",
      type: "Clickables",
      method: 'Visit the pet lookup of a Mutant Tonu with 0 HP or a disease. 				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Nazrudin" title="" target="new">Nazrudin</a>)',
      retired: false
    },
    {
      url: "/images/avatars/pinkcybunny.gif",
      avatar: "Who Me?",
      type: "Clickables",
      method: 'Visit the pet lookup of a Pink Cybunny.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Chandler" title="" target="new">Chandler</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Cherries" title="" target="new">Cherries</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Ralphie" title="" target="new">Ralphie</a>)',
      retired: false
    },
    {
      url: "/images/avatars/royalboyusul.gif",
      avatar: "Usul - Royal Boy",
      type: "Clickables",
      method: 'Visit the pet lookup of a Royalboy Usul.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Breno" title="" target="new">Breno</a>)',
      retired: false
    },
    {
      url: "/images/avatars/spardel.gif",
      avatar: "Spardel",
      type: "Clickables",
      method: 'Visit the pet lookup of a Neopet with a Spardel attached.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Amaranthine" title="" target="new">Amaranthine</a>)',
      retired: false
    },
    {
      url: "/images/avatars/sdb.gif",
      avatar: "SDB Pack Rat",
      type: "Items",
      method: "Have at least 1000 UNIQUE items in your Safety Deposit Box.",
      retired: false
    },
    {
      url: "/images/avatars/spottedgelert.gif",
      avatar: "Spotted Gelert",
      type: "Clickables",
      method: 'Visit the pet lookup of a Spotted Gelert.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Dalmatian" title="" target="new">Dalmatian</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Luna" title="" target="new">Luna</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Russ" title="" target="new">Russ</a>)',
      retired: false
    },
    {
      url: "/images/avatars/tuskyrelax.gif",
      avatar: "Tuskaninny - Relax",
      type: "Clickables",
      method: 'Visit the pet lookup of an Island Tuskaninny. Island Tuskaninny				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Carmella" title="" target="new">Carmella</a>)',
      retired: false
    },
    {
      url: "/images/avatars/draikegg.gif",
      avatar: "Draik - Hatched",
      type: "Pet/Petpet",
      method: "Visit the Draik Nest while having a Draik as your active pet.",
      retired: false
    },
    {
      url: "/images/avatars/treehugger.gif",
      avatar: "Money Tree - Treehugger",
      type: "Other",
      method: "Awarded randomly when claiming items from the Money Tree",
      retired: false
    },
    {
      url: "/images/avatars/unifaboo.gif",
      avatar: "Uni Faboo",
      type: "Other",
      method: "Purchase any rarity 80 or higher item from the Clothing Shop.",
      retired: false
    },
    {
      url: "/images/avatars/wishingwell.gif",
      avatar: "Wishing Well",
      type: "Other",
      method: "Donate 69420 of NP to the Wishing Well.",
      retired: false
    },
    {
      url: "/images/avatars/sssidney.gif",
      avatar: "Sssidney",
      type: "Games",
      method: "Win something when scratching a Deserted Fairground Scratchcard.",
      retired: false
    },
    {
      url: "/images/avatars/snowager.gif",
      avatar: "Snowager - Rawr!",
      type: "Other",
      method: "Random when getting blasted by the Snowager.",
      retired: false
    },
    {
      url: "/images/avatars/snorkle.gif",
      avatar: "Snorkle",
      type: "Items",
      method: "Feed your pet a Snorkle Snout",
      retired: false
    },
    {
      url: "/images/avatars/speckled.gif",
      avatar: "Speckled",
      type: "Items",
      method: "Feed your pet an item with 'speckled' in the name.",
      retired: false
    },
    {
      url: "/images/avatars/custard.gif",
      avatar: "Mmm, custard!",
      type: "Items",
      method: "Feed your pet an item with 'custard' in the name.",
      retired: false
    },
    {
      url: "/images/avatars/jetsamchomp.gif",
      avatar: "Jetsam Chomp!",
      type: "Items",
      method: "Feed your Jetsam an Aquatic Petpet (i.e. Baby Blu).",
      retired: false
    },
    {
      url: "/images/avatars/runaway_garlic.gif",
      avatar: "Garlic! Run!!",
      type: "Items",
      method: "Feed your pet an item with 'garlic' in the name.",
      retired: false
    },
    {
      url: "/images/avatars/pinkpopcorn.gif",
      avatar: "Pink!",
      type: "Items",
      method: "Feed your pink pet an item with 'popcorn' in the name.",
      retired: false
    },
    {
      url: "/images/avatars/wickedlenny.gif",
      avatar: "Lenny - Wicked",
      type: "Items",
      method: "Feed your Lenny any Spooky Food item.",
      retired: false
    },
    {
      url: "/images/avatars/donoteatcarrot.gif",
      avatar: "Do Not Eat!!",
      type: "Items",
      method: "Feed your pet an item with 'carrot' in the name.",
      retired: false
    },
    {
      url: "/images/avatars/elephantesurprise.gif",
      avatar: "Elephante Surprise",
      type: "Items",
      method: 'Feed a "Bag of Peanuts" to your Elephante.',
      retired: false
    },
    {
      url: "/images/avatars/achyfi.gif",
      avatar: "Achyfi!",
      type: "Items",
      method: "Feed your pet an item with 'drink' or 'juice' in the name.",
      retired: false
    },
    {
      url: "/images/avatars/cocojubjub.gif",
      avatar: "Coconut Jubjub",
      type: "Items",
      method: "Feed any Tropical Food to your Coconut Jubjub.",
      retired: false
    },
    {
      url: "/images/avatars/queenfyora.gif",
      avatar: "Queen Fyora",
      type: "Items",
      method: "Play with a Faerie Queen Doll.",
      retired: false
    },
    {
      url: "/images/avatars/kikosnacktime.gif",
      avatar: "Kiko - Snack Time!",
      type: "Items",
      method: "Feed any food item your pet between 3am-4am or 3pm-4pm NST.",
      retired: false
    },
    {
      url: "/images/avatars/royalkorbat_girl.gif",
      avatar: "Korbat - Royalgirl",
      type: "Clickables",
      method: 'View the lookup of a Royalgirl Korbat.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Hilda" title="" target="new">Hilda</a>)',
      retired: false
    },
    {
      url: "/images/avatars/novaplushie.gif",
      avatar: "Plushie Nova",
      type: "Items",
      method: "Purchase an R90+ plushie from the Plushie Shop",
      retired: false
    },
    {
      url: "/images/avatars/royalkorbat_boy.gif",
      avatar: "Korbat - Royalboy",
      type: "Clickables",
      method: 'View the lookup of a Royalboy Korbat.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Icarus" title="" target="new">Icarus</a>)',
      retired: false
    },
    {
      url: "/images/avatars/3legs.gif",
      avatar: "Cap'n Threelegs",
      type: "Other",
      method: "Complete a session of training at the Swashbuckling Academy.",
      retired: false
    },
    {
      url: "//images/avatars/kacheek_happy.gif",
      avatar: "Faerie Kacheek",
      type: "Clickables",
      method: 'View the lookup of a Faerie Kacheek				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Oay" title="" target="new">Oay</a>)',
      retired: false
    },
    {
      url: "//images/avatars/tropical_elephante.gif",
      avatar: "Elephante - Tropical",
      type: "Clickables",
      method: 'View the lookup of a Island Elephante				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=HarleyJay" title="" target="new">HarleyJay</a>)',
      retired: false
    },
    {
      url: "/images/avatars/chia_juicy.gif",
      avatar: "Chia - Juicy",
      type: "Items",
      method: "Feed any item containing the word 'Juice' to your Pineapple Chia",
      retired: false
    },
    {
      url: "/images/avatars/pwned.gif",
      avatar: "Pwned by the Lab",
      type: "Other",
      method: "Change your pet's species at the Secret Laboratory",
      retired: false
    },
    {
      url: "/images/avatars/mazzew.gif",
      avatar: "Mazzew",
      type: "Pet/Petpet",
      method: "View your own pet's lookup that has a 221+ day old Mazzew attatched to it.",
      retired: false
    },
    {
      url: "/images/avatars/huggy.gif",
      avatar: "Huggy",
      type: "Pet/Petpet",
      method: "Visit your own pet's lookup that has a 99+-day-old Huggy attatched to it.",
      retired: false
    },
    {
      url: "/images/avatars/kiko_boat.gif",
      avatar: "Kiko - Hi!",
      type: "Other",
      method: "Visit the page for Glass Bottom Boat Tours between 10am NST - sunset (6pm?)",
      retired: false
    },
    {
      url: "/images/avatars/tikiwanted.gif",
      avatar: "WANTED - Tiki Tack Man",
      type: "Other",
      method: "Plot Prize",
      retired: true
    },
    {
      url: "/images/avatars/tiki_trap.gif",
      avatar: "Tiki Tack - It's a Trap!!!",
      type: "Other",
      method: "Plot Prize",
      retired: true
    },
    {
      url: "/images/avatars/tarla.gif",
      avatar: "Tarla - Shop of Mystery",
      type: "Other",
      method: "Buy any item at Tarla's Shop of Mystery (restocks every 15 minutes)",
      retired: false
    },
    {
      url: "/images/avatars/ghostkerchief.gif",
      avatar: "Ghostkerchief - Spooky!",
      type: "Pet/Petpet",
      method: "Visit the lookup of your own pet with a Ghostkerchief attached (100+ days old)",
      retired: false
    },
    {
      url: "//images/avatars/cheeky_acara.gif",
      avatar: "Acara - Cheeky Smile",
      type: "Clickables",
      method: 'View the lookup of a Halloween Acara				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Gerard" title="" target="new">Gerard</a>)',
      retired: false
    },
    {
      url: "/images/avatars/kadoatie_witch.gif",
      avatar: "Kadoatie - Witchy!",
      type: "Pet/Petpet",
      method: "View the lookup of your own Halloween Chia/Peophin/Bruce/Lenny/Korbat that has a Kadoatie attached,",
      retired: false
    },
    {
      url: "/images/avatars/angelpuss2.gif",
      avatar: "Angelpuss",
      type: "Pet/Petpet",
      method: "View the quick reference page while owning a pet with an Angelpuss attached",
      retired: false
    },
    {
      url: "/images/avatars/stormy_uni.gif",
      avatar: "Uni - Rumbling",
      type: "Other",
      method: 'Have a Firestorm Bottle in your inventory and visit the lookup of a Darigan Uni.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Rodin" title="Firestorm Bottle" target="new">Rodin</a>)',
      retired: false
    },
    {
      url: "/images/avatars/molterone_heat.gif",
      avatar: "Moltenore - Heat",
      type: "Pet/Petpet",
      method: "View the quick reference page while owning a pet with a Moltenore attached",
      retired: false
    },
    {
      url: "/images/avatars/kiko_overlord.gif",
      avatar: "Kiko Overlord",
      type: "Pet/Petpet",
      method: "Visit specific page with a Kiko as your active pet.",
      retired: false
    },
    {
      url: "/images/avatars/brucicle.gif",
      avatar: "Brucicle",
      type: "Pet/Petpet",
      method: "Visit the Super Happy Icy Fun Snow Shop with an Ice Bruce as your active pet.",
      retired: false
    },
    {
      url: "/images/avatars/soaring_pteri.gif",
      avatar: "Rainbow Pteri - Soaring",
      type: "Pet/Petpet",
      method: "Visit Mystery Island with a Rainbow Pteri as your active pet.",
      retired: false
    },
    {
      url: "/images/avatars/fireblumaroo.gif",
      avatar: "Blumaroo - Fire!",
      type: "Pet/Petpet",
      method: "Visit the lookup of your own Fire Blumaroo with a 30+ day old fire petpet",
      retired: false
    },
    {
      url: "/images/avatars/kauboy.gif",
      avatar: "Kauboy!",
      type: "Other",
      method: `Buy "Ten Gallon Hat" from Uni's Clothing Shop`,
      retired: false
    },
    {
      url: "/images/avatars/usul_19.gif",
      avatar: "Usul - Jared, 19",
      type: "Games",
      method: "Awarded when your pet goes down in intelligence when spinning the Wheel of Knowledge.",
      retired: false
    },
    {
      url: "/images/avatars/draik_cute.gif",
      avatar: "Draik - Cute",
      type: "Items",
      method: "Random when using any grooming item on your own Draik.",
      retired: false
    },
    {
      url: "/images/avatars/gelert_vivid.gif",
      avatar: "Gelert - Vivid",
      type: "Other",
      method: "Visit the Petpet Puddle with a Reject Gelert Plushie in your inventory",
      retired: false
    },
    {
      url: "/images/avatars/avatarcollector.gif",
      avatar: "Avatar Collector",
      type: "Other",
      method: "Be in top 100 on HST at trophy time",
      retired: false
    },
    {
      url: "/images/avatars/koiplushie.gif",
      avatar: "Koi - Spotted Plushie",
      type: "",
      method: 'View lookup of a spotted koi with a koi plushie in your inventory				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Cristal" title="" target="new">Cristal</a>)',
      retired: false
    },
    {
      url: "/images/avatars/hungryskeith.gif",
      avatar: "Feed Me",
      type: "",
      method: "Feed your skeith an item with skeith in the name",
      retired: false
    },
    {
      url: "/images/avatars/toasty.gif",
      avatar: "Toasty",
      type: "",
      method: "Visit Techo Mountain with any 'bread' item in your inventory",
      retired: false
    },
    {
      url: "/images/avatars/carmariller.gif",
      avatar: "Carmariller",
      type: "",
      method: 'Visit a pet with a Caramiller attached				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Oay" title="" target="new">Oay</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Xaia" title="" target="new">Xaia</a>)',
      retired: false
    },
    {
      url: "/images/avatars/fungree_imfine.gif",
      avatar: "Fungree - I'm Fine",
      type: "Pet/Petpet",
      method: 'View lookup of a pet with a fungree attached				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Cactus" title="" target="new">Cactus</a>)',
      retired: false
    },
    {
      url: "/images/avatars/sleepy_kiko.gif",
      avatar: "Kiko - Sleepy Time",
      type: "Pet/Petpet",
      method: 'View lookup of a Maraquan Kiko between 8pm and 8am NST				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Oyster" title="" target="new">Oyster</a>)',
      retired: false
    },
    {
      url: "/images/avatars/draik_golden.gif",
      avatar: "Draik - Stay Golden",
      type: "Items",
      method: "Have your pet play with a Golden Draik Plushie",
      retired: false
    },
    {
      url: "/images/avatars/shoyru_sparples.gif",
      avatar: "Faerie Shoyru - Ooh, sparples!!",
      type: "Pet/Petpet",
      method: 'Visit a faerie shoyru with a faerie plush in your inventory.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Elle" title="Faerie plushie" target="new">Elle</a>)',
      retired: false
    },
    {
      url: "/images/avatars/slorg.gif",
      avatar: "Slorg",
      type: "",
      method: "View lookup of your pet with slorg attached (100+ days)",
      retired: false
    },
    {
      url: "/images/avatars/gruslen.gif",
      avatar: "Gruslen",
      type: "Pet/Petpet",
      method: "View lookup of your own pet with a Gruslen attached (99+ days)",
      retired: false
    },
    {
      url: "/images/avatars/aim_skeith_plushie.gif",
      avatar: "Skeith - Lovable Plushie!",
      type: "Items",
      method: "Have your skeith play with any colour skeith plushie",
      retired: false
    },
    {
      url: "/images/avatars/gnorbu_clouds.gif",
      avatar: "Gnorbu - Head in the Clouds!",
      type: "",
      method: 'Visit a Cloud Gnorbu with a Cirrus petpet.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Cottonwool" title="" target="new">Cottonwool</a>)',
      retired: false
    },
    {
      url: "/images/avatars/rainbow.gif",
      avatar: "Paint Brush Plushie Connoisseur",
      type: "Items",
      method: "Have Cloud, Baby, Island, Split, Fire, Disco, Starry, and Lost Desert Paint Brush Plushies in your inventory and view it",
      retired: false
    },
    {
      url: "/images/avatars/cybunny_sleepy.gif",
      avatar: "Cybunny - Sleepy",
      type: "Clickables",
      method: 'View lookup of a Grey Cybunny with 1hp				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Courtney" title="" target="new">Courtney</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Demise" title="" target="new">Demise</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Vesper" title="" target="new">Vesper</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=espresso_depresso" title="" target="new">espresso_depresso</a>)',
      retired: false
    },
    {
      url: "/images/avatars/unisuki.gif",
      avatar: "Usukigirl Uni",
      type: "Pet/Petpet",
      method: 'View lookup of a Usukigirl Uni				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Starlit" title="" target="new">Starlit</a>)',
      retired: false
    },
    {
      url: "/images/avatars/plushietonu.gif",
      avatar: "Plushie!",
      type: "Other",
      method: "Donate any plushie to the Money Tree",
      retired: false
    },
    {
      url: "/images/avatars/lestinpeace.gif",
      avatar: "Lester - May He Lest in Peace",
      type: "Items",
      method: "Donate a Lesser Spotted Fish to the Money Tree",
      retired: false
    },
    {
      url: "/images/avatars/emosuki.gif",
      avatar: "Emo Usuki",
      type: "Other",
      method: "View your Shop Front with Emo Usuki as your shopkeeper",
      retired: false
    },
    {
      url: "/images/avatars/stompyboi.gif",
      avatar: "Korbat - Plushie Dance!!!",
      type: "Pet/Petpet",
      method: "Give your Plushie Pet any Plushie to play with",
      retired: false
    },
    {
      url: "/images/avatars/fruitsalad_av.gif",
      avatar: "Chia - Yummy Yummy!",
      type: "Pet/Petpet",
      method: "Feed your Chia a Magical Chia Pop",
      retired: false
    },
    {
      url: "/images/avatars/dariganpteri.gif",
      avatar: "Pteri - Darigan",
      type: "",
      method: 'View the lookup of a Darigan Pteri				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Test2" title="" target="new">Test2</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=foul" title="" target="new">foul</a>)',
      retired: false
    },
    {
      url: "/images/avatars/shellow_gardening.gif",
      avatar: "Shellow - Garden Rollin'",
      type: "",
      method: "TBC",
      retired: false
    },
    {
      url: "/images/avatars/mushi_psychedelic.gif",
      avatar: "Mushi - Psychedelic 1-Up",
      type: "",
      method: "TBC",
      retired: false
    },
    {
      url: "/images/avatars/faerie_draik.gif",
      avatar: "Draik - Fae on Film",
      type: "",
      method: 'View the lookup of a Faerie Draik with a Faerie Petpet				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Toci" title="" target="new">Toci</a>)',
      retired: false
    },
    {
      url: "/images/avatars/draik_tyrannian_angry.gif",
      avatar: "Draik - GRR!!!",
      type: "Items",
      method: 'View lookup of a Tyrannian Draik with an omelette in your inventory				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Eight" title="omelette" target="new">Eight</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Great" title="omelette" target="new">Great</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Prehistoric" title="omelette" target="new">Prehistoric</a>)\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Tender" title="omelette" target="new">Tender</a>)',
      retired: false
    },
    {
      url: "/images/avatars/bugchompav2.gif",
      avatar: "AAAAAAAAA CHOMP!!!",
      type: "Items",
      method: "Feed your grarrl a Flightning Bug",
      retired: false
    },
    {
      url: "/images/avatars/chocolate.gif",
      avatar: "Chocolate!",
      type: "Other",
      method: "Grab an R90(?) From the Chocolate Shop",
      retired: false
    },
    {
      url: "/images/avatars/neomailaddict_RPoPBiF.gif",
      avatar: "Neomail Addict",
      type: "Other",
      method: "Random when viewing the neomessages (inbox, read, sent)",
      retired: false
    },
    {
      url: "/images/avatars/kacheek_spooky.gif",
      avatar: "Kacheek - Spooky!",
      type: "",
      method: `Have a 'ghost' item in your inventory and view a Ghost pet				<br><b>Pets: </b>
									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Beware" title="ghost" target="new">Beware</a>)
									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Boner" title="ghost" target="new">Boner</a>)
									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Ghostkerchief" title="ghost" target="new">Ghostkerchief</a>)`,
      retired: false
    },
    {
      url: "/images/avatars/quiggle_sup.gif",
      avatar: "Quiggle - Sup",
      type: "",
      method: 'View lookup of a baby quiggle				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Fucker" title="" target="new">Fucker</a>)',
      retired: false
    },
    {
      url: "/images/avatars/faeblum.gif",
      avatar: "Faerie Blumaroo",
      type: "Pet/Petpet",
      method: 'View pet lookup of your Faerie Blumaroo with a Faerie Plushie in your inventory.				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Schellani" title="" target="new">Schellani</a>)',
      retired: false
    },
    {
      url: "/images/avatars/brightvale.gif",
      avatar: "Brightvale",
      type: "Games",
      method: "Land on the star on the Wheel of Knowledge",
      retired: false
    },
    {
      url: "/images/avatars/mutant_xwee_love.gif",
      avatar: "Xweetok - Spiffy Mutant!",
      type: "Pet/Petpet",
      method: "Use a grooming item on your Mutant Xweetok",
      retired: false
    },
    {
      url: "/images/avatars/blumaroo_like_magic.gif",
      avatar: "Blumaroo - Like Magic!",
      type: "Other",
      method: "Restock any Blumaroo Morphing Potion from Kauvara's.",
      retired: false
    },
    {
      url: "/images/avatars/misfortune.gif",
      avatar: "Wheel Of Misfortune",
      type: "Games",
      method: "Have an item turned to sludge by the Wheel of Misfortune.",
      retired: false
    },
    {
      url: "/images/avatars/sadoatery.gif",
      avatar: "Grey Kadoatie - Mew :(",
      type: "",
      method: `View lookup of a Grey Pet with a Grey Kadoatie while having a 'grey' item in your inventory				<br><b>Pets: </b>
									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Pris" title="'grey' something" target="new">Pris</a>)`,
      retired: false
    },
    {
      url: "/images/avatars/chomby_gaby_shades.gif",
      avatar: "Chomby - 2Cool4NeoSchool",
      type: "",
      method: `View lookup of a Chomby with 'Round Sunglasses' in your inventory				<br><b>Pets: </b>
									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Stegosaurus" title="'sunglasses'" target="new">Stegosaurus</a>)`,
      retired: false
    },
    {
      url: "/images/avatars/esophagor.gif",
      avatar: "Esophagor - HUNGGRRYYY!!!",
      type: "",
      method: "Random when completing a quest for the Esophagor.",
      retired: false
    },
    {
      url: "/images/avatars/zafara_9WrH1nQ.gif",
      avatar: "Faerie Zafara",
      type: "",
      method: "View the pet lookup of your Faerie Zafara",
      retired: false
    },
    {
      url: "/images/avatars/A3.gif",
      avatar: "Chia's Ascension",
      type: "",
      method: 'View the lookup of a Chia with 0hp				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Zoie" title="" target="new">Zoie</a>)',
      retired: false
    },
    {
      url: "/images/avatars/slushiechia.gif",
      avatar: "Slushie Chia!",
      type: "",
      method: "Feed your Chia a Magical Chia Slushie",
      retired: false
    },
    {
      url: "/images/avatars/petpetlabray.gif",
      avatar: "Petpet Laboratory",
      type: "Other",
      method: "Have your petpet turned to soot by the Petpet Laboratory",
      retired: false
    },
    {
      url: "/images/avatars/meowclops_close.gif",
      avatar: "Meowclops",
      type: "",
      method: "View the Quick Ref page with a Meowclops attached to one of your pets",
      retired: false
    },
    {
      url: "/images/avatars/mummifiedruki.gif",
      avatar: "Ruki - Mummified",
      type: "Pet/Petpet",
      method: "View the pet lookup of your Halloween Ruki with a 30+ day old Mummy Baby petpet.",
      retired: false
    },
    {
      url: "/images/avatars/fuzzy.gif",
      avatar: "Walking Carpet - Fuzzy!",
      type: "Pet/Petpet",
      method: "View pet lookup of your pet with a Walking Carpet petpet attached",
      retired: false
    },
    {
      url: "/images/avatars/stoopid.gif",
      avatar: "Stoopid",
      type: "",
      method: "View lookup of your own pet with 'None' intelligence",
      retired: false
    },
    {
      url: "/images/avatars/mallard.gif",
      avatar: "Mallard",
      type: "",
      method: "View lookup of your own pet with an aged Mallard (age TBC)",
      retired: false
    },
    {
      url: "/images/avatars/pirate_krawk.gif",
      avatar: "Pirate Krawk",
      type: "",
      method: "View lookup of your Pirate Krawk while having a 'pirate' item in your inventory",
      retired: false
    },
    {
      url: "/images/avatars/stampsMystery2352.gif",
      avatar: "Stamp Collector - Mystery Island",
      type: "",
      method: "Have all Mystery Island stamps; view album page.",
      retired: false
    },
    {
      url: "/images/avatars/stampsVirtupets9764.gif",
      avatar: "Stamp Collector - Virtupets",
      type: "",
      method: "Have all Virtupets stamps; view album page.",
      retired: false
    },
    {
      url: "/images/avatars/stampsTyrannia3421.gif",
      avatar: "Stamp Collector - Tyrannia",
      type: "",
      method: "Have all Tyrannia stamps; view album page.",
      retired: false
    },
    {
      url: "/images/avatars/stampsHaunted3192.gif",
      avatar: "Stamp Collector - Haunted Woods",
      type: "",
      method: "Have all Haunted Wood stamps; view album page.",
      retired: false
    },
    {
      url: "/images/avatars/stampsDesert0013.gif",
      avatar: "Stamp Collector - Lost Desert",
      type: "",
      method: "Have all Lost Desert stamps; view album page.",
      retired: false
    },
    {
      url: "/images/avatars/stampsSnowy2312.gif",
      avatar: "Stamp Collector - Snowy Valley",
      type: "",
      method: "Have all Snowy Valley stamps; view album page.",
      retired: false
    },
    {
      url: "/images/avatars/ona.gif",
      avatar: "Ona",
      type: "",
      method: "View quickref when you have a pet with an Ona attached",
      retired: false
    },
    {
      url: "/images/avatars/ANGYYYY.gif",
      avatar: "Plumpy - ANGRY >:(",
      type: "",
      method: "TBC",
      retired: false
    },
    {
      url: "/images/avatars/magical.gif",
      avatar: "Magical!",
      type: "Items",
      method: "Play with a Magical Green Plushie",
      retired: false
    },
    {
      url: "/images/avatars/bluna.gif",
      avatar: "Bluna",
      type: "",
      method: "Restock a Bluna from Tyrannian Petpets",
      retired: false
    },
    {
      url: "/images/avatars/darigankrawk.gif",
      avatar: "Darigan Krawk",
      type: "Clickables",
      method: 'View the lookup of a Darigan Krawk				<br><b>Pets: </b>\n									(<a href="https://neopetsclassic.com/petlookup/?pet_name=Vengeful" title="" target="new">Vengeful</a>)',
      retired: false
    },
    {
      url: "/images/avatars/fishsquid.gif",
      avatar: "Fishing - Titanic Squid",
      type: "",
      method: "TBC",
      retired: false
    },
    {
      url: "/images/avatars/taelia.gif",
      avatar: "Taelia the Snow Faerie",
      type: "",
      method: "TBC",
      retired: false
    },
    {
      url: "/images/avatars/gourmet_kadoatie.gif",
      avatar: "Kadoatie - Expensive!",
      type: "Items",
      method: "Feed a gourmet food item to a Kadoatie",
      retired: false
    },
    {
      url: "/images/avatars/KrawkPals.gif",
      avatar: "Krawk - Pals",
      type: "Pet/Petpet",
      method: "View quickref when you have a Krawk pet with a Krawk petpet attached",
      retired: false
    },
    {
      url: "/images/avatars/loveroo_av_kathryn.gif",
      avatar: "Love Roo",
      type: "Pet/Petpet",
      method: "Own four Blumaroo",
      retired: false
    },
    {
      url: "/images/avatars/royal_tea_vika.gif",
      avatar: "RoyalTea",
      type: "Items",
      method: "Feed a 'Tea' item to a Royal pet",
      retired: false
    },
    {
      url: "/images/avatars/fishwantme.gif",
      avatar: "Fish Want Me",
      type: "",
      method: "Fish with a pet that has a fishing level over 500.",
      retired: false
    },
    {
      url: "/images/avatars/neodaqtick.gif",
      avatar: "Sell! SELL!!",
      type: "",
      method: "TBC - Something something Stock Market.",
      retired: false
    }
  ];

  // src/avatars/index.js
  var url2 = "/neoboards/avatars/?username=";
  function handler2() {
    const images = Array.from(document.querySelectorAll(`img[src*="avatars"]`));
    let notFound = [];
    for (let image of images) {
      const done = !image.style.filter;
      const i = avatars_default.findIndex((e) => e.url === image.src || e.avatar === image.title);
      if (i > -1) {
        avatars_default[i].done = done;
      } else {
        notFound.push({ avatar: image.title, done });
        console.warn("the following image was found on the neoboards page, but is not in avatars.json. check for a url change, name change or new avatars and update the script.");
        console.log(image);
      }
    }
    const table = `
    <section id="userscript-avatars">
        ${(() => {
      if (notFound.length) {
        return `The following avatar are unknown, please check for userscript updates. <ul>
                    ${notFound.map((e) => `<li>${e.avatar} (${e.done ? "completed" : "missing"})</li>`).join("")}
                </ul>`;
      }
      return "";
    })()}
        <fieldset>
            <label><input type="radio" name="userscript-show" value="all">Show all</label>
            <label><input type="radio" name="userscript-show" value="completed">Show completed</label>
            <label><input type="radio" name="userscript-show" value="missing">Show missing</label>
        </fieldset>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Avatar</th>
                    <th>Type</th>
                    <th>Method</th>
                </tr>
            </thead>
            <tbody>
                ${avatars_default.map((e) => `<tr data-done="${e.done}" data-retired="${e.retired}">
                        <td><img src="${e.url}" /></td>
                        <td>${e.avatar}</td>
                        <td>${e.type}</td>
                        <td>${e.method}</td>
                    </tr>`).join("")}
            </tbody>
        </table>
    </section>
    <style>
    #userscript-avatars label {
        cursor: pointer;
    }
    #userscript-avatars label:hover {
        text-decoration: underline
    }
    #userscript-avatars td {
        border: 1px solid #aaa;
    }
    [data-done="true"] {
        background: lightgreen;
    }
    [data-done="false"][data-retired="true"][data-done="false"] {
        background: repeating-linear-gradient(-45deg, #ccc, #ccc 10px, #ddd 10px, #ddd 20px)
    }
    #userscript-avatars[data-show="completed"] [data-done="false"],
    #userscript-avatars[data-show="missing"] [data-done="true"] {
        display: none;
    }
    </style>`;
    const target = document.querySelector("#center");
    target.insertAdjacentHTML("beforebegin", table);
    const settings = {
      get showPreference() {
        return localStorage.getItem("show-preference") ?? "all";
      },
      set showPreference(value) {
        localStorage.setItem("show-preference", value);
        document.querySelector("#userscript-avatars").dataset.show = value;
      }
    };
    document.querySelector("#userscript-avatars fieldset").addEventListener("change", (e) => {
      settings.showPreference = e.target.value;
    });
    settings.showPreference = settings.showPreference;
    document.querySelector(`#userscript-avatars input[value="${settings.showPreference}"]`).checked = true;
    target.parentElement.removeChild(target.nextElementSibling);
  }
  var avatars_default2 = {
    url: url2,
    handler: handler2
  };

  // src/index.js
  var scripts = [stamps_default, avatars_default2];
  var script = scripts.find((e) => window.location.href.includes(e.url));
  if (script) {
    script.handler();
  }
})();
