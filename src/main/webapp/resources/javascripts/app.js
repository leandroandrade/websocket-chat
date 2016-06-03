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
	for (x = 0; x < listaConexoes.length; x++) {
		if (listaConexoes[x].processo == $('#do-chat\\:processo').val()) {
			wsocket = listaConexoes[x].socket;
			break;
		}
	}
	var dados =  '{"processo":"' + $('#do-chat\\:processo').val() + '",'+
				 '"msg":"' + $('#do-chat\\:message').val() + '",'+ 
				 '"remetente":"' + $('#do-chat\\:nickname').val() + '"}';
	wsocket.send(dados);
	$('#do-chat\\:message').val('');
}

function connectToChatserver() {
	if(!existeConexaoAberta()){
		wsocket = new WebSocket(serviceLocation + $('#do-chat\\:processo').val());
		wsocket.onmessage = onMessageReceived;
		listaConexoes.push({processo:$('#do-chat\\:processo').val(), socket:wsocket});
	
		$processo = $('#do-chat\\:processo').val();
		$('#processos').append("<div id='"+$processo+"'><a href='javascript:mostrarProcesso("+$processo+")'>"+$processo+"(<i id='i"+$processo+"'>0</i>)</div><br />");
		$('#respostas').append('<table id="response'+$processo+'"></table>');
		var $messageLine = $('<tr>'+
								'<td class="message badge">conexão aberta:</td>'+
							'</tr>');
		$('#response'+$processo).append($messageLine);
		mostrarProcesso($processo);
	}
}

function fecharConexao() {
	wsocket.close();
	for (x = 0; x < listaConexoes.length; x++) {
		if (listaConexoes[x].processo == $('#do-chat\\:processo').val()) {
			listaConexoes[x].splice(x, listaConexoes[x].processo);
		}
	}
	window.alert("Conexão "+$('#do-chat\\:processo').val()+" fechada com sucesso!");
}

function mostrarProcesso(processo) {
	for (x = 0; x < listaConexoes.length; x++) {
		if (listaConexoes[x].processo == processo) {
			document.getElementById("response" + processo).style.display = "";
			$('#do-chat\\:processo').val(processo);
		} else {
			document.getElementById("response" + listaConexoes[x].processo).style.display = "none";
		}
	}
}

function existeConexaoAberta(){
	for (x = 0; x < listaConexoes.length; x++) {
		if(listaConexoes[0].processo == $('#do-chat\\:processo').val()){
			window.alert("Já existe uma conexão estabelecida para o processo " + $('#do-chat\\:processo').val());
			return true
		}
	}
	return false;
}