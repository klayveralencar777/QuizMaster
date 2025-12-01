// App QuizMaster — Material Design Edition
// ===== API FUTURA AQUI =====

const app = document.getElementById("app");

function materialHeader(title) {
  return `<h2 class="fw-bold text-center mb-4">${title}</h2>`;
}

function renderLogin() {
  app.innerHTML = `
    <div class="page-container">
      <div class="card-custom">
        ${materialHeader("QuizMaster")}
        <input id="loginUser" class="form-control mb-2" placeholder="Usuário" />
        <input id="loginPass" type="password" class="form-control mb-3" placeholder="Senha" />
        <button class="btn btn-main w-100 mb-3" onclick="login()">Entrar</button>
        <p class="text-center">Não tem conta? 
          <span class="text-info" onclick="renderRegister()" style="cursor:pointer;">Registrar</span>
        </p>
      </div>
    </div>
  `;
}

function renderRegister() {
  app.innerHTML = `
    <div class="page-container">
      <div class="card-custom">
        ${materialHeader("Criar Conta")}
        <input id="regUser" class="form-control mb-2" placeholder="Usuário" />
        <input id="regPass" type="password" class="form-control mb-3" placeholder="Senha" />
        <button class="btn btn-main w-100 mb-3" onclick="register()">Registrar</button>
        <p class="text-center">Já tem conta?
          <span class="text-info" onclick="renderLogin()" style="cursor:pointer;">Entrar</span>
        </p>
      </div>
    </div>
  `;
}

function renderHome() {
  app.innerHTML = `
    <div class="page-container">
      <div class="card-custom">
        ${materialHeader("Escolha o Quiz")}
        <button class="btn btn-main w-100 mb-2" onclick="startQuiz('esporte')">Esportes</button>
        <button class="btn btn-main w-100 mb-2" onclick="startQuiz('cinema')">Cinema</button>
        <button class="btn btn-main w-100 mb-2" onclick="startQuiz('musica')">Música</button>
      </div>
    </div>
  `;
}

const quizzes = {
  esporte: ["Pergunta de Esporte 1?", "Pergunta de Esporte 2?"],
  cinema: ["Pergunta de Cinema 1?", "Pergunta de Cinema 2?"],
  musica: ["Pergunta de Música 1?", "Pergunta de Música 2?"]
};

let currentQuiz = [];
let currentIndex = 0;
let score = 0;

function startQuiz(category) {
  currentQuiz = quizzes[category];
  currentIndex = 0;
  score = 0;
  renderQuestion();
}

function renderQuestion() {
  if (currentIndex >= currentQuiz.length) return showScore();

  const q = currentQuiz[currentIndex];

  app.innerHTML = `
    <div class="page-container">
      <div class="card-custom">
        <h4 class="mb-4">${q}</h4>
        <div class="quiz-option" onclick="answer(true)">Opção Correta</div>
        <div class="quiz-option" onclick="answer(false)">Opção Errada</div>
        <div class="quiz-option" onclick="answer(false)">Opção Errada</div>
      </div>
    </div>
  `;
}

function answer(correct) {
  if (correct) score++;
  currentIndex++;
  renderQuestion();
}

function showScore() {
  app.innerHTML = `
    <div class="page-container">
      <div class="card-custom text-center">
        ${materialHeader("Resultado")}
        <h3 class="mb-4">Você fez <span class="text-info">${score}</span> pontos!</h3>
        <button class="btn btn-main w-100" onclick="renderHome()">Voltar ao início</button>
      </div>
    </div>
  `;
}

function register() {
  localStorage.setItem("user", document.getElementById("regUser").value);
  localStorage.setItem("pass", document.getElementById("regPass").value);
  renderLogin();
}

function login() {
  let u = document.getElementById("loginUser").value;
  let p = document.getElementById("loginPass").value;

  if (u === localStorage.getItem("user") && p === localStorage.getItem("pass"))
    renderHome();
  else alert("Usuário ou senha incorretos!");
}

renderLogin();
