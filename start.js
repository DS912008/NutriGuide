const apiKey = "c7d79de8d35747ca8e62c6a5d73b580e";

const searchBtn = document.getElementById("search-btn");
const ingredientsInput = document.getElementById("ingredients");
const recipeResults = document.getElementById("recipe-results");

const recipeModal = document.getElementById("recipe-modal");
const modalContent = document.getElementById("modal-content");
const closeModalBtn = document.getElementById("close-modal");

let lastSearchedIngredients = "";

// Load default recipes on page load
document.addEventListener("DOMContentLoaded", () => {
    fetchDefaultRecipes();
});

// Handle search button click
searchBtn.addEventListener("click", () => {
    const ingredients = ingredientsInput.value.trim();
    if (ingredients && ingredients !== lastSearchedIngredients) {
        lastSearchedIngredients = ingredients;
        fetchRecipes(ingredients);
    } else if (!ingredients) {
        alert("Please enter some ingredients.");
    }
});

// Fetch default random recipes
const fetchDefaultRecipes = async () => {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/random?number=6&apiKey=${apiKey}`);
        const data = await response.json();
        console.log("Default Recipes:", data);
        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch default recipes.");
        }

        displayRecipes(data.recipes);
    } catch (error) {
        console.error("Error fetching default recipes:", error);
        alert("Error: " + error.message);
    }
};

// Fetch recipes by ingredients
const fetchRecipes = async (ingredients) => {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=6&apiKey=${apiKey}`);
        const recipes = await response.json();
        console.log("Fetched Recipes by Ingredients:", recipes);
        if (!response.ok) {
            throw new Error(recipes.message || "Failed to fetch recipes.");
        }

        displayRecipes(recipes);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        alert("Error: " + error.message);
    }
};

// Display recipe cards
const displayRecipes = (recipes) => {
    recipeResults.innerHTML = "";

    recipes.forEach((recipe) => {
        const title = recipe.title || "Untitled Recipe";
        const image = recipe.image || "https://via.placeholder.com/150";
        const recipeId = recipe.id;

        const recipeCard = document.createElement("div");
        recipeCard.className = "recipe-card";
        recipeCard.innerHTML = `
            <img src="${image}" alt="${title}">
            <h3>${title}</h3>
            <button class="view-recipe-btn" data-id="${recipeId}">View Recipe</button>
        `;
        recipeResults.appendChild(recipeCard);
    });

    // Attach event listeners to view buttons
    document.querySelectorAll(".view-recipe-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            fetchRecipeDetails(e.target.getAttribute("data-id"));
        });
    });
};

// Fetch full recipe details
const fetchRecipeDetails = async (recipeId) => {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`);
        const recipe = await response.json();
        console.log("Recipe Details:", recipe);
        if (!response.ok) {
            throw new Error(recipe.message || "Failed to fetch recipe details.");
        }

        showRecipeModal(recipe);
    } catch (error) {
        console.error("Error fetching recipe details:", error);
        alert("Error: " + error.message);
    }
};

// Show modal with recipe info
const showRecipeModal = (recipe) => {
    modalContent.innerHTML = `
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}">
        <h3>Ingredients:</h3>
        <ul>
            ${recipe.extendedIngredients.map((ing) => `<li>${ing.original}</li>`).join("")}
        </ul>
        <h3>Instructions:</h3>
        <p>${recipe.instructions?.trim() || "No instructions available."}</p>
    `;
    recipeModal.style.display = "block";
};

// Close modal
closeModalBtn.addEventListener("click", () => {
    recipeModal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === recipeModal) {
        recipeModal.style.display = "none";
    }
});
