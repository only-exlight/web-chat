$(document).ready(function(){
    let disabled = false;
    $("#send").click(function(){
        let data = {name: $("#yourname").val(), mess: $("#yourmess").val()};
        if(data.name == "" || data.mess == "") {
            $("#yourname").attr("placeholder","Как вас зовут?");
            $("#yourmess").attr("placeholder","Что вы хотите сказать этому миру?");
        } else {
            $.get("/sendmess", data);
            $("#yourname").prop("disabled",true);
            disabled = true;
            $("#yourmess").val("");
        }
    })
    
    let focus = false;
    $("#yourmess").focus(function(){
        focus = true;
    })
    $("#yourmess").blur(function(){
        focus = false;
    })
    
    $(document).on("keyup",function(e){
        if (e.keyCode==13 && focus) {
            let data = {name: $("#yourname").val(), mess: $("#yourmess").val()};
            if(data.name == "" || data.mess == "") {
                $("#yourname").attr("placeholder","Как вас зовут?");
                $("#yourmess").attr("placeholder","Что вы хотите сказать этому миру?");
            } else {
                $.get("/sendmess", data);
                $("#yourname").prop("disabled",true);
                disabled = true;
                $("#yourmess").val("");
            }
        } 
    })
    
    let keys;
    $(document).on("keydown",function(e){
        if(focus && disabled) {
            let data = {name: $("#yourname").val(), mess: $("#yourmess").val()};
            $.get("/nowsend",data);
        }
    })
    
    setInterval(function(){
        $("#hist").load("/hist");
        $("#now").load("/now");
    },1000);
})
