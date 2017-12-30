<?php
  $json = $_POST['json'];
  $json = json_decode($json, true);

  $name = $json['nome'];
  $visitor_email = $json['email'];
  $mensagem = '';

  if($json['telefone'] != ''){
    $mensagem = 'Telefone:'.$json['telefone'].'<br><br>';
  }

  $mensagem.= str_replace("\n", "<br>", $json['mensagem']);

  $headers  = 'MIME-Version: 1.0' . "\r\n";
  $headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
  $headers .= "From:".$name." \r\n";
  $headers .= "Reply-To:".$visitor_email." \r\n";

  $to = "paulohpfranco@uol.com.br";

if(IsInjected($visitor_email))
{
    echo "Bad email value!";
    exit;
}

  echo mail("$to","Jovens Betel - Formulario de contato","$mensagem","$headers");

function IsInjected($str)
{
    $injections = array('(\n+)',
           '(\r+)',
           '(\t+)',
           '(%0A+)',
           '(%0D+)',
           '(%08+)',
           '(%09+)'
           );
               
    $inject = join('|', $injections);
    $inject = "/$inject/i";
    
    if(preg_match($inject,$str))
    {
      return true;
    }
    else
    {
      return false;
    }
}



?>