var AnnotateImageRequests = {requests: []};

var apiKey = "AIzaSyCF2DVvnz6sI81_a2Jkt890y8na5IdFfwc";
var food2fork = 'c103ba7d0a1fa27872bc2e2a6a224ae9';

cloudVisionURL = "https://vision.googleapis.com/v1/images:annotate?key=" + apiKey + "";
foodURL = 'https://community-food2fork.p.mashape.com/search?key=c103ba7d0a1fa27872bc2e2a6a224ae9&q=';
getRecipeURL = "https://community-food2fork.p.mashape.com/get?key=c103ba7d0a1fa27872bc2e2a6a224ae9&rId=";
MashapeKey = 'QM5kNr6mfnmshHGr87kiK2ME43fmp1UMzZGjsnyXlkLPSHi067';


function runQuery(imgRequest, cloudVisionURL) { // add parameters
  $.ajax({
    url: cloudVisionURL,
    method: "POST",
    data: imgRequest,
    contentType: 'application/json'
  }).done(function(cloudData) {
    console.log("URL:" + cloudVisionURL);
    console.log(cloudData);
    parseArray(cloudData);
  }).fail(function (jqXHR, textStatus, errorThrown) {
     console.log('ERRORS: ' + textStatus + ' ' + errorThrown);
  });
}

function searchByIngredients(ingredientArray) {
  console.log(foodURL);
  $.ajax({
    url: foodURL,
    method: "GET",
    headers: {
      'X-Mashape-Key': MashapeKey,
      'Accept': 'application/json'
    }
  }).done(function(foodData) {
    getRecipe(foodData);
  });
}

function getRecipe(foodData){
  //console.log(foodData);
  //var recipeId = JSON.parse(foodData).recipes[0].recipe_id;
  $.ajax({
    url: getRecipeURL + recipeId,
    method: "GET",
    headers: {
      'X-Mashape-Key': MashapeKey,
      'Accept': 'application/json'
    }
  }).done(function(foodData) {
    $("#img2").attr("src", JSON.parse(foodData).recipe.image_url);
    console.log(JSON.parse(foodData).recipe.image_url);
  });
}

function getIngredientList(data) {

  console.log(data.responses);
  console.log(data.responses[0].labelAnnotations[0].description);

  for (var i = 0; i < data.responses[0].labelAnnotations.length; i++) {
    ing.push(data.responses[0].labelAnnotations[i].description);
  }

  var convertedArray = encodeURIComponent(ing);
  //foodURL += convertedArray;
  return convertedArray
}

function encodeImageFileAsURL(element) {
  var file = element.files[0];
  var reader = new FileReader();

  reader.onloadend = function() {

    $("#img").attr("src", reader.result);    
    buildJson(reader.result.replace('data:image/jpeg;base64,', ""));    
    runQuery(JSON.stringify(AnnotateImageRequests), cloudVisionURL);

  }
  reader.readAsDataURL(file);
}

function buildJson(img64){
  var imageObj = {content: img64};
  var featuresObj1 = {type: "LABEL_DETECTION", maxResults: 10};
  var AnnotateImageRequestObj = {image: imageObj, features: [featuresObj1]};
  AnnotateImageRequests.requests.push(AnnotateImageRequestObj);
}

var validIng = ["cooked",
"shredded",
"chicken",
"warm",
"hot",
"sauce",
"mayo",
"carrot",
"grated",
"celery",
"sliced",
"onion",
"diced",
"cheese",
"crumbled",
"cheddar",
"slices",
"bread",
"butter",
"coffee",
"water",
"half-and-half",
"sweetened",
"condensed",
"milk",
"skim",
"sugar",
"sweeteners",
"syrups",
"macaroni",
"cloves",
"garlic",
"minced",
"peeled",
"pitted",
"fresh",
"lime",
"juice",
"chopped",
"cilantro",
"salt",
"pepper",
"flour",
"avocado",
"garnish",
"potatoes",
"olive oil",
"rosemary",
"herbs",
"vegetable",
"yeast",
"baking powder",
"soda",
"cinnamon",
"frosting",
"powdered",
"brewed",
"jalapeno",
"peppers",
"sourdough",
"cream",
"tortilla chips",
"extra-virgin",
"leaves",
"thyme",
"oregano",
"paprika",
"well-crumbled",
"bay leaf",
"lemon",
"chilled",
"ice",
"semolina",
"cornmeal",
"pork",
"chipotle",
"adobo",
"jalapenos",
"bacon",
"frozen",
"spinach",
"thawed",
"drained",
"artichoke",
"mayonnaise",
"clove",
"chili",
"parmigiano",
"reggiano",
"parmesan",
"mozzarella",
"cubed",
"cocoa",
"eggs",
"buttermilk",
"chickpeas",
"garbanzo beans",
"beans",
"ripe",
"wheat",
"bread",
"sandwich",
"toppings",
"lettuce",
"tomato",
"sprouts",
"tomatoes",
"rotel",
"diced",
"chilies",
"cumin",
"beef",
"breakfast",
"sausage",
"dried",
"parsley",
"basil",
"lowfat",
"cottage",
"shredded",
"lasagna",
"noodles",
"pasta",
"water",
"graham cracker",
"crumbs",
"dark chocolate",
"vanilla",
"extract",
"guinness",
"bananas",
"egg",
"peanut",
"guacamole",
"jalapeño",
"stems",
"seeds",
"rigatoni",
"crushed",
"roasted",
"vegetables",
"carrots",
"corn",
"peas",
"broth",
"worcestershire",
"seasonings",
"honey",
"confectioners",
"bite sized",
"pieces",
"stalks",
"rice",
"gluten free",
"sauce",
"mashed",
"enchilada",
"chile",
"tortillas",
"coconut",
"oats",
"almond",
"meal",
"skinless",
"boneless",
"breast",
"bottle",
"barbeque",
"italian",
"salad dressing",
"salad",
"dressing",
"nutmeg",
"pumpkin",
"stevia",
"swiss",
"rye",
"butter",
"orange",
"zest",
"marshmallow",
"creme",
"peaches",
"kiwi",
"fruit",
"blueberries",
"pears",
"raspberries",
"thighs",
"beer",
"burrito",
"queso",
"quesadilla",
"salsa",
"peeps",
"rice krispies",
"rice krispies treats",
"cajun",
"spice",
"fettuccine",
"low sodium",
"wine",
"cayenne",
"shrimp",
"lemons",
"tabasco",
"cake",
"pecans",
"tapioca",
"mexican",
"muffin",
"pickled",
"panko",
"onions",
"steak",
"tenderized",
"seasoned",
"tabasco",
"rolls",
"pint",
"strawberries",
"starchy",
"russets",
"nutella",
"chocolate",
"hazelnut",
"spread",
"granulated",
"unsalted",
"scoop",
"cookie",
"cupcakes",
"nuts",
"mezzaluna",
"linguine",
"smoked",
"chinese",
"pie",
"masala",
"seasoning",
"apples",
"refrigerated",
"cookies",
"velvet cake",
"canola",
"cheesecake",
"filling",
"quinoa",
"broccoli",
"broccoli florets",
"almonds",
"feta",
"biscuits",
"wedges",
"thai",
"pure",
"sifted",
"creamy",
"reese's",
"baileys",
"icing",
"lentils",
"ginger",
"curry",
"scallions",
"raisins",
"puree",
"monterey",
"picante",
"mushrooms",
"breadcrumbs",
"caramel",
"rolos",
"sausages",
"oreo",
"brownie",
"cider",
"vinegar",
"syrup",
"bourbon",
"chilis",
"tartar",
"yolk",
"greek yogurt",
"yogurt",
"cookies",
"espresso",
"loaf",
"sushi",
"sesame",
"tofu",
"walnuts",
"uncooked",
"ribs",
"kernels",
"guacamole",
"juiced",
"stalk",
"cauliflower",
"low-sodium",
"pitas",
"bean",
"yolks",
"mustard",
"corned",
"vinaigrette",
"saffron",
"confit",
"pea",
"pesto",
"arugula",
"caramelized",
"sauteed",
"cheeses",
"meats",
"pizza",
"pepperoni",
"olives",
"pico de gallo",
"tilapia",
"fillets",
"soybean",
"blend",
"distilled",
"turmeric",
"apple",
"dumplings",
"spices",
"zucchini",
"squash",
"slice",
"lard",
"salted",
"salmon",
"soy",
"crackers",
"chuck",
"fat",
"ketchup",
"pickle",
"relish",
"hamburger",
"buns",
"dill",
"pickles",
"iceberg",
"core",
"bun-sized",
"deli-cut",
"american",
"granules",
"muscovado",
"caster",
"curls",
"pimentos",
"pickles",
"chocolate",
"canned",
"ricotta",
"apricots",
"plums",
"berries",
"grapes",
"spices",
"spaghetti",
"shallot",
"parmigiano-reggiano",
"ale",
"gluten",
"dijon",
"bouillon",
"land o' lakes",
"cornstarch",
"cucumber",
"meat",
"kidney",
"beef",
"bison",
"turkey",
"whiskey",
"barbecue",
"stew",
"whisked",
"cremini",
"truffle",
"fontina",
"gruyere",
"poppyseed",
"frosting",
"crisco",
"buttercream",
"chips",
"gin",
"vodka",
"sprigs",
"rump roast",
"soup",
"loaves",
"ciabatta",
"fat-free",
"chobani",
"pita",
"serrano",
"pulp",
"kale",
"crackers",
"cabbage",
"mung sprouts",
"scallions",
"cucumbers",
"cashews",
"skillet",
"flank",
"jasmine",
"mint",
"peppermint",
"whole-milk",
"turkey",
"sage",
"marshmallows",
"pineapple",
"spears",
"skewered",
"chops",
"sriracha",
"pimentos",
"pumpkin-pie"];