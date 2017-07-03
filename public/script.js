document.addEventListener('DOMContentLoaded', VkInit);
function VkInit(){
  VK.init({
    apiId: 6069953
  }, false, false);

  setTimeout(function() {
    VK.Auth.getLoginStatus(VkLoginStatus, true)
  }, 0);
}

const authBtn = document.querySelector('.js-auth');
authBtn.addEventListener('click', function(event){
  VK.Auth.login(VkLogin);
})

function VkLogin(data){
  VkLoginStatus(data)
}

function VkLoginStatus(data){
  if (data.status === 'connected') {
    const userName = document.querySelector('.js-user-name');
    const authBtn = document.querySelector('.js-auth');

    userName.innerText = data.session.user.first_name + ' ' + data.session.user.last_name;

    VK.api('friends.get',
    {
      user_id: data.session.user.id,
      fields: 'first_name, last_name, user_id',
    },
    showFriends)
    showLogoutButton();
    authBtn.style.display='none';
  } else {
    cleanInfo();
  }
}

function showFriends(data) {
  const friends = data.response
    .sort(compareRandom)
    .slice(0, 5);
  const friendsList = document.querySelector('.js-user-friends');
  let HTML = '';
  friends.forEach(function(friend){
    HTML += `<li>
      <a href="https://vk.com/id${friend.user_id}" target="_blank" class="user-friend">
        ${friend.first_name} ${friend.last_name}
      </a>
    </li>`
  })
  friendsList.innerHTML = HTML;
}

function compareRandom(a, b) {
  return Math.random() - 0.5;
}

function showLogoutButton(){
  const logoutBtn = document.querySelector('.js-logout');
  logoutBtn.style.display='block';
  logoutBtn.addEventListener('click', function(){
    VK.Auth.logout();
    setTimeout(function() {
      VK.Auth.getLoginStatus(VkLoginStatus, true)
    }, 1000)
  })
}

function cleanInfo(){
  const userName = document.querySelector('.js-user-name');
  const friendsList = document.querySelector('.js-user-friends');
  userName.innerText='';
  friendsList.innerText='';
  const logoutBtn = document.querySelector('.js-logout');
  logoutBtn.style.display='none';
}
