// ACTION DEFAULT CHANGE BG
(() => {
  const rand = Math.floor(Math.random() * 3);
  $(".authentication-bg")
    .css("background", "url('../images/bg-auth-" + rand + ".jpg') center")
    .css("background-size", "cover");
})();

// ACTION FORM SUBMIT
$("#form-auth").on("submit", async (e) => {
  e.preventDefault();

  const email = $("#emailaddress").val();
  const password = $("#password").val();
  const signin = $("#checkbox-signin").is(":checked");

  const datas = {
    email,
    password,
    signin,
  };

  const connFetch = await fetch("http://" + location.host + "/auth", {
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: JSON.stringify(datas),
  });
  const response = await connFetch;

  // IF LOGIN SUCCESS
  if (response.status == 200) {
    $(location).attr("href", "http://" + location.host + "/dashboard");
  } else {
    const message = await response.json();
    $("#emailaddress").val("");
    $("#password").val("");
    $("#emailaddress").focus();
    alert(message.error);
  }
});
