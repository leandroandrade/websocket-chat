var wsocket;
var serviceLocation = "ws://"+window.location.host+"/websockets/chat/";

var listaConexoes = [];

function onMessageReceived(evt){
	var dados = JSON.parse(evt.data); // native API
	var $messageLine = $('<tr>'+
							'<td class="message badge"><b>' +dados.remetente+ '</b>:</td>'+
							'<td class="message badge">' +dados.msg+ '</td>'+
						'</tr>');
	$('#response'+dados.processo).append($messageLine);
	$('#i'+dados.processo).html(parseInt($('#i'+dados.processo).html())+1);
}
function sendMessage() {
	for(x=0;x<listaConexoes.length;x++){
		if(listaConexoes[x].processo == $('#processo').val()){
			wsocket = listaConexoes[x].socket;
			break;
		}
	}
	var dados =  '{"processo":"' + $('#processo').val() + '",'+
				 '"msg":"' + $('#message').val() + '",'+ 
				 '"remetente":"' + $('#nickname').val() + '"}';
	wsocket.send(dados);
	$('#message').val('');
}

function connectToChatserver() {
	wsocket = new WebSocket(serviceLocation + $('#processo').val());
	wsocket.onmessage = onMessageReceived;
	listaConexoes.push({processo:$('#processo').val(), socket:wsocket});

	$processo = $('#processo').val();
	$('#processos').append("<div id='"+$processo+"'><a href='javascript:mostrarProcesso("+$processo+")'>"+$processo+"(<i id='i"+$processo+"'>0</i>)</div><br />");
	$('#respostas').append('<table id="response'+$processo+'"></table>');
	var $messageLine = $('<tr>'+
							'<td class="message badge">conexão aberta:</td>'+
						'</tr>');
	$('#response'+$processo).append($messageLine);
	mostrarProcesso($processo);
}

function fecharConexao(){
	wsocket.close();
	var $messageLine = $('<tr>'+
			'<td class="message badge"><b>conexão fechada</b>:</td>'+
		'</tr>');
	$('#response').append($messageLine);
}

function mostrarProcesso(processo){
	for(x=0;x<listaConexoes.length;x++){
		if(listaConexoes[x].processo == processo){
			document.getElementById("response"+processo).style.display = "";
			$('#processo').val(processo);
		}else{
			document.getElementById("response"+listaConexoes[x].processo).style.display = "none";
		}
	}
}

$(document).ready(function() {	
	$('#do-chat').submit(function(evt) {
		evt.preventDefault();
		sendMessage()
	});
});