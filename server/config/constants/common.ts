
var nodemailer = require("nodemailer");

class Common {
    

	static STRIPEPUBLICKEY: string = 'pk_test_W3AWlvrzo3jtQnDsKtyCGCUS';
	static STRIPESECRETKEY: string = 'sk_test_aediX53shAzQkRvioEKu6CXV';
	static STRIPEWEBHOOKKEY: string ='whsec_4qQvss7pZ1TRBO8NDuQjPHndTN84r3W4';
	static STRIPEFREEPLANAPPLICATIONS: number=10;
	static STRIPEFREEPLANUSERS: number=3;
	static STUDYING_ID: string ='599a92797c086869cba64408';
	static INTERCOM_ACCESS_TOKEN: string = process.env.INTERCOM_ACCESS_TOKEN || 'dG9rOmJmNGQ2ZWViX2I1ZmVfNDE2Zl9iZGFlXzY3ODNiY2UxZGYzMzoxOjA=';

    static SEND_FROM_EMAIL: string ="info@76east.com";
    static ADMIN_EMAIL: string = "info@76east.com";

    static SITE_URL: string = "http://66.235.194.119:3006";
    
	
	//live details
	static MAIL_CONFIG: any = {
		service: "76east",
        host: "mail.76east.com",
        port: 587,
        auth: {
        user: 'info@76east.com',
           pass: 'seventysix13!'
        },
        tls: {
            rejectUnauthorized: false
        }
		
	};
	
	/*static MAIL_CONFIG: any = {
		service: "gmail",
		host: "smtp.gmail.com",
		auth: {
			user: "76eastclient150901@gmail.com",
			pass: "9418850287"
		}
	};*/
    
    static EMAIL_TEMPLATE_HEADER: string = `<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
	<head>
		
		<meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Task completed!</title>
        
    <style type="text/css">
		p{
			margin:10px 0;
			padding:0;
		}
		table{
			border-collapse:collapse;
		}
		h1,h2,h3,h4,h5,h6{
			display:block;
			margin:0;
			padding:0;
		}
		img,a img{
			border:0;
			height:auto;
			outline:none;
			text-decoration:none;
		}
		body,#bodyTable,#bodyCell{
			height:100%;
			margin:0;
			padding:0;
			width:100%;
		}
		.mcnPreviewText{
			display:none !important;
		}
		#outlook a{
			padding:0;
		}
		img{
			-ms-interpolation-mode:bicubic;
		}
		table{
			mso-table-lspace:0pt;
			mso-table-rspace:0pt;
		}
		.ReadMsgBody{
			width:100%;
		}
		.ExternalClass{
			width:100%;
		}
		p,a,li,td,blockquote{
			mso-line-height-rule:exactly;
		}
		a[href^=tel],a[href^=sms]{
			color:inherit;
			cursor:default;
			text-decoration:none;
		}
		p,a,li,td,body,table,blockquote{
			-ms-text-size-adjust:100%;
			-webkit-text-size-adjust:100%;
		}
		.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
			line-height:100%;
		}
		a[x-apple-data-detectors]{
			color:inherit !important;
			text-decoration:none !important;
			font-size:inherit !important;
			font-family:inherit !important;
			font-weight:inherit !important;
			line-height:inherit !important;
		}
		.templateContainer{
			max-width:600px !important;
		}
		a.mcnButton{
			display:block;
		}
		.mcnImage,.mcnRetinaImage{
			vertical-align:bottom;
		}
		.mcnTextContent{
			word-break:break-word;
		}
		.mcnTextContent img{
			height:auto !important;
		}
		.mcnDividerBlock{
			table-layout:fixed !important;
		}
	/*
	@tab Page
	@section Heading 1
	@style heading 1
	*/
		h1{
			color:#222222;
			font-family:Helvetica;
			font-size:40px;
			font-style:normal;
			font-weight:bold;
			line-height:150%;
			letter-spacing:normal;
			text-align:left;
		}
	/*
	@tab Page
	@section Heading 2
	@style heading 2
	*/
		h2{
			color:#222222;
			font-family:Helvetica;
			font-size:28px;
			font-style:normal;
			font-weight:bold;
			line-height:150%;
			letter-spacing:normal;
			text-align:left;
		}
	/*
	@tab Page
	@section Heading 3
	@style heading 3
	*/
		h3{
			color:#444444;
			font-family:Helvetica;
			font-size:22px;
			font-style:normal;
			font-weight:bold;
			line-height:150%;
			letter-spacing:normal;
			text-align:left;
		}
	/*
	@tab Page
	@section Heading 4
	@style heading 4
	*/
		h4{
			color:#999999;
			font-family:Georgia;
			font-size:20px;
			font-style:italic;
			font-weight:normal;
			line-height:125%;
			letter-spacing:normal;
			text-align:left;
		}
	/*
	@tab Header
	@section Header Container Style
	*/
		#templateHeader{
			background-color:#ffffff;
			background-image:none;
			background-repeat:no-repeat;
			background-position:center;
			background-size:cover;
			border-top:0;
			border-bottom:0;
			padding-top:7px;
			padding-bottom:7px;
		}
	/*
	@tab Header
	@section Header Interior Style
	*/
		.headerContainer{
			background-color:transparent;
			background-image:none;
			background-repeat:no-repeat;
			background-position:center;
			background-size:cover;
			border-top:0;
			border-bottom:0;
			padding-top:0;
			padding-bottom:0;
		}
	/*
	@tab Header
	@section Header Text
	*/
		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
			color:#808080;
			font-family:Helvetica;
			font-size:16px;
			line-height:150%;
			text-align:left;
		}
	/*
	@tab Header
	@section Header Link
	*/
		.headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{
			color:#00ADD8;
			font-weight:normal;
			text-decoration:underline;
		}
	/*
	@tab Body
	@section Body Container Style
	*/
		#templateBody{
			background-color:#FFFFFF;
			background-image:none;
			background-repeat:no-repeat;
			background-position:center;
			background-size:cover;
			border-top:0;
			border-bottom:0;
			padding-top:27px;
			padding-bottom:63px;
		}
	/*
	@tab Body
	@section Body Interior Style
	*/
		.bodyContainer{
			background-color:transparent;
			background-image:none;
			background-repeat:no-repeat;
			background-position:center;
			background-size:cover;
			border-top:0;
			border-bottom:0;
			padding-top:0;
			padding-bottom:0;
		}
	/*
	@tab Body
	@section Body Text
	*/
		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
			color:#808080;
			font-family:Helvetica;
			font-size:16px;
			line-height:150%;
			text-align:left;
		}
	/*
	@tab Body
	@section Body Link
	*/
		.bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{
			color:#00ADD8;
			font-weight:normal;
			text-decoration:underline;
		}
	/*
	@tab Footer
	@section Footer Style
	*/
		#templateFooter{
			background-color:#ffffff;
			background-image:none;
			background-repeat:no-repeat;
			background-position:center;
			background-size:cover;
			border-top:0;
			border-bottom:0;
			padding-top:0px;
			padding-bottom:0px;
		}
	/*
	@tab Footer
	@section Footer Interior Style
	*/
		.footerContainer{
			background-color:transparent;
			background-image:none;
			background-repeat:no-repeat;
			background-position:center;
			background-size:cover;
			border-top:0;
			border-bottom:0;
			padding-top:0;
			padding-bottom:0;
		}
	/*
	@tab Footer
	@section Footer Text
	*/
		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{
			color:#FFFFFF;
			font-family:Helvetica;
			font-size:12px;
			line-height:150%;
			text-align:center;
		}
	/*
	@tab Footer
	@section Footer Link
	*/
		.footerContainer .mcnTextContent a,.footerContainer .mcnTextContent p a{
			color:#FFFFFF;
			font-weight:normal;
			text-decoration:underline;
		}
	@media only screen and (min-width:768px){
		.templateContainer{
			width:600px !important;
		}

}	@media only screen and (max-width: 480px){
		body,table,td,p,a,li,blockquote{
			-webkit-text-size-adjust:none !important;
		}

}	@media only screen and (max-width: 480px){
		body{
			width:100% !important;
			min-width:100% !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnRetinaImage{
			max-width:100% !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImage{
			width:100% !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{
			max-width:100% !important;
			width:100% !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnBoxedTextContentContainer{
			min-width:100% !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImageGroupContent{
			padding:9px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
			padding-top:9px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{
			padding-top:18px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImageCardBottomImageContent{
			padding-bottom:9px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImageGroupBlockInner{
			padding-top:0 !important;
			padding-bottom:0 !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImageGroupBlockOuter{
			padding-top:9px !important;
			padding-bottom:9px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnTextContent,.mcnBoxedTextContentColumn{
			padding-right:18px !important;
			padding-left:18px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
			padding-right:18px !important;
			padding-bottom:0 !important;
			padding-left:18px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcpreview-image-uploader{
			display:none !important;
			width:100% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Heading 1
	@tip Make the first-level headings larger in size for better readability on small screens.
	*/
		h1{
			font-size:30px !important;
			line-height:125% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Heading 2
	@tip Make the second-level headings larger in size for better readability on small screens.
	*/
		h2{
			font-size:26px !important;
			line-height:125% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Heading 3
	@tip Make the third-level headings larger in size for better readability on small screens.
	*/
		h3{
			font-size:20px !important;
			line-height:150% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Heading 4
	@tip Make the fourth-level headings larger in size for better readability on small screens.
	*/
		h4{
			font-size:18px !important;
			line-height:150% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Boxed Text
	@tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px.
	*/
		.mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
			font-size:14px !important;
			line-height:150% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Header Text
	@tip Make the header text larger in size for better readability on small screens.
	*/
		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
			font-size:16px !important;
			line-height:150% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Body Text
	@tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px.
	*/
		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
			font-size:16px !important;
			line-height:150% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Footer Text
	@tip Make the footer content text larger in size for better readability on small screens.
	*/
		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{
			font-size:14px !important;
			line-height:150% !important;
		}

}</style></head>
    <body>
		
		<!--[if !gte mso 9]><!----><span class="mcnPreviewText" style="display:none; font-size:0px; line-height:0px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; visibility:hidden; mso-hide:all;"></span><!--<![endif]-->
		<!--*|END:IF|*-->
        <center>
            <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
                <tr>
                    <td align="center" valign="top" id="bodyCell">
                        <!-- BEGIN TEMPLATE // -->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
							<tr>
								<td align="center" valign="top" id="templateHeader" data-template-container>
									<!--[if (gte mso 9)|(IE)]>
									<table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
									<tr>
									<td align="center" valign="top" width="600" style="width:600px;">
									<![endif]-->
									<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
										<tr>
                                			<td valign="top" class="headerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">
    <tbody class="mcnImageBlockOuter">
            <tr>
                <td valign="top" style="padding:0px" class="mcnImageBlockInner">
                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">
                        <tbody><tr>
                            <td class="mcnImageContent" valign="top" style="padding-right: 0px; padding-left: 0px; padding-top: 0; padding-bottom: 0;">
                                
                                    
                                     
                                    
                                
                            </td>
                        </tr>
                    </tbody></table>
                </td>
            </tr>
    </tbody>
</table></td>
										</tr>
									</table>
									<!--[if (gte mso 9)|(IE)]>
									</td>
									</tr>
									</table>
									<![endif]-->
								</td>
                            </tr>
							<tr>
								<td align="center" valign="top" id="templateBody" data-template-container>
									<!--[if (gte mso 9)|(IE)]>
									<table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
									<tr>
									<td align="center" valign="top" width="600" style="width:600px;">
									<![endif]-->
									<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
										<tr>
                                			<td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnCodeBlock">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner">
                <style type="text/css">
  #PreviewIntercomModal .ic_message_content h1,
  #PreviewIntercomModal .ic_message_content h2 {
    color: #0072b0 !important;
  }
  #PreviewIntercomModal .ic_message_without_image > .ic_message_internals > .ic_message_content {
    border-color: #0072b0 !important;
  }
  #PreviewIntercomModal .ic_user_comment_body {
    background-color: #0072b0 !important;
    border-color: #0072b0 !important;
  }
  #PreviewIntercomModal .ic_message_content a {
    color: #0072b0 !important;
  }
  #PreviewIntercomModal .ic_message_content a:hover {
    color: #0072b0 !important;
  }
  #PreviewIntercomModal .ic_user_comment_body {
    background-color: #0072b0 !important;
    border-color: #0072b0 !important;
  }
  .intercom-h2b-button br {
    display: none;
  }
</style>
<style type="text/css" data-premailer="ignore">
  /* styles in here will not be inlined. Use for media queries etc */
  /* force Outlook to provide a "view in browser" menu link. */
  #outlook a {padding:0;}
  /* prevent Webkit and Windows Mobile platforms from changing default font sizes.*/
  body{width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0;}
  /* force Hotmail to display emails at full width */
  .ExternalClass {width:100%;}
  /* force Hotmail to display normal line spacing. http://www.emailonacid.com/forum/viewthread/43/ */
  .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;}
  /* fix a padding issue on Outlook 07, 10 */
  table td {border-collapse: collapse;}
  table {
    table-layout: fixed;
  }

  @media only screen and (max-width: 480px)
  {
    br.hidden { display: block !important; }
    td.padding_cell { display: none !important; }
    table.message_footer_table td {
      font-size: 11px !important;
    }
  }
  @media only screen and (max-device-width: 480px)
  {
    br.hidden { display: block !important; }
    td.padding_cell { display: none !important; }
    table.message_footer_table td {
      font-size: 11px !important;
    }
  }
</style>

<style type="text/css" data-premailer="ignore">
  /* styles in here will not be inlined. Use for media queries etc */
  /* force Outlook to provide a "view in browser" menu link. */
  #outlook a {padding:0;}
  /* prevent Webkit and Windows Mobile platforms from changing default font sizes.*/
  body{width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0;}
  /* force Hotmail to display emails at full width */
  .ExternalClass {width:100%;}
  /* force Hotmail to display normal line spacing. http://www.emailonacid.com/forum/viewthread/43/ */
  .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;}
  /* fix a padding issue on Outlook 07, 10 */
  table td {border-collapse: collapse;}

  @media only screen and (max-width: 480px)
  {
    br.hidden { display: block !important; }
    td.padding_cell { display: none !important; }
    table.message_footer_table td {
      font-size: 11px !important;
    }
  }
  @media only screen and (max-device-width: 480px)
  {
    br.hidden { display: block !important; }
    td.padding_cell { display: none !important; }
    table.message_footer_table td {
      font-size: 11px !important;
    }
  }
</style>

<style type="text/css">

  .admin_name b {
    color: #6f6f6f;
  }

  .date_cell a {
    color: #999999;
  }

  .comment_header_td {
    width: 100%;
    background: #1bafdd;
    border: none;
    font-family: 'Helvetica Neue',Arial,sans-serif
  }

  .content-td {
    color: #525252;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
    font-family: Helvetica, Arial, sans-serif;
  }

  .content-td h1 {
    font-size: 26px;
    line-height: 33px;
    color: #282F33;
    margin-bottom: 7px;
    margin-top: 30px;
    font-weight: normal;
  }

  .content-td h1 a {
    color: #282F33;
  }

  .content-td h2 {
    font-size: 18px;
    font-weight: bold;
    color: #282F33;
    margin: 30px 0 7px;
  }

  .content-td h2 a {
    color: #282F33;
  }

  .content-td h1 + h2 {
    margin-top: 0 !important;
  }

  .content-td h2 + h1 {
    margin-top: 0 !important;
  }

  .content-td h3 ,
  .content-td h4 ,
  .content-td h5 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .content-td p {
    margin: 0 0 17px 0;
    line-height: 1.5;
  }

  .content-td p img,
  .content-td h1 img,
  .content-td h2 img,
  .content-td li img,
  .content-td .intercom-h2b-button img {
    margin: 0;
    padding: 0;
  }

  .content-td a {
    color: #1251ba;
  }

  .content-td p.intro {
    font-size: 20px;
    line-height: 30px;
  }

  .content-td blockquote {
    margin: 40px 0;
    font-style: italic;
    color: #8C8C8C;
    font-size: 18px;
    text-align: center;
    padding: 0 30px;
    font-family: Georgia, sans-serif;
    quotes: none;
  }

  .content-td blockquote a {
    color: #8C8C8C;
  }

  .content-td ul {
    list-style: disc;
    margin: 0 0 20px 40px;
    padding: 0;
  }

  .content-td ol {
    list-style: decimal;
    margin: 0 0 20px 40px;
    padding: 0;
  }

  .content-td img {
    margin: 17px 0;
    max-width: 100%;
  }

  .content-td .intercom-container {
    margin-bottom: 16px;
  }

  .content-td hr {
    border: none;
    border-top: 1px solid #DDD;
    border-bottom: 0;
    margin: 50px 30% 50px 30%;
  }

  table.intercom-container {
    margin: 17px 0;
  }
  table.intercom-container.intercom-align-center {
    margin-left: auto;
    margin-right: auto;
  }

  table.intercom-container td {
    background-color: #1bafdd;
    padding: 12px 35px;
    border-radius: 3px;
    font-family: Helvetica, Arial, sans-serif;
    margin: 0;
  }

  .content-td .intercom-h2b-button {
    font-size: 14px;
    color: #FFF;
    font-weight: bold;
    display: inline-block;
    text-decoration: none;
    background-color: #1bafdd;
    border: none !important;
    
      padding: 13px 35px;
    
  }

  a.intercom-h2b-button {
    background-color: #0E4595;
    border-radius: 5px;
    border: 1px solid rgba(0,0,0,0.2);
    color:#fff;
    display: inline-block;
    font-size: 15px;
    font-weight: bold;
    min-height: 20px;
    text-decoration: none;
  }

  .content-td .intercom-h2b-button:hover {
    background-color:#38c0ea;
  }

  .message_footer_table .avatar {
    -ms-interpolation-mode: bicubic;
    -webkit-background-clip: padding-box;
    -webkit-border-radius: 20px;
    background-clip: padding-box;
    border-radius: 20px;
    display: inline-block;
    height: 40px;
    max-width: 100%;
    outline: none;
    text-decoration: none;
    width: 40px;
  }

  .powered-by-table .powered-by-text a {
    font-weight: bold;
    text-decoration: none;
    color: #999;
  }

  .main_wrapper {
    padding: 0 20px;
  }

  .margin-arrow {
    display: none;
    
    visibility:hidden;
    width:0;
    height:0;
    max-width: 0;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
  }

  .content-td > :first-child {
    margin-top: 0;
    padding-top: 0;
  }
</style>


<style type="text/css" data-premailer="ignore">

  @media screen and (max-width: 635px) {
    .main-wrap {
      width: 100% !important;
    }
  }

  @media screen and (max-width: 480px) {
    .content-td {
      padding: 30px 15px !important;
    }
    .content-td h1 {
      margin-bottom: 5px;
    }
    .message_footer_table .space {
      width: 20px !important;
    }

    .message_footer_table .arrow-wrap {
      padding-left: 20px !important;
    }

    .message_footer_table .admin_name b{
      display: block !important;
    }

    .main_wrapper {
      padding: 0;
    }

    .image-arrow {
      display: none !important;
    }

    .margin-arrow {
      display: table !important;
      visibility:visible !important;
      width: 100% !important;
      height: auto !important;
      max-width: none !important;
      max-height: none !important;
      opacity: 1 !important;
      overflow: visible !important;
    }

    .comment_body {
      border-bottom: 1px solid #DDD !important;
    }

    .footer-td-wrapper {
      display: block !important;
      width: 100% !important;
      text-align: left !important;
    }
    .footer-td-wrapper .date_cell {
      text-align: left !important;
      padding: 15px 0 0 20px !important;
    }
  }

</style>


<style type="text/css" data-premailer="ignore">
  .content-td blockquote + * {
    margin-top: 20px !important;
  }

  .ExternalClass .content-td h1 {
    padding: 20px 0 !important;
  }

  .ExternalClass .content-td h2 {
    padding: 0 0 5px !important;
  }

  .ExternalClass .content-td p {
    padding: 10px 0 !important;
  }

.ExternalClass .content-td .intercom-container {
    padding: 5px 0 !important;
  }

  .ExternalClass .content-td hr + * {
    padding-top: 30px !important;
  }

  .ExternalClass .content-td ol ,
  .ExternalClass .content-td ul {
    padding: 0 0 20px 40px !important;
    margin: 0 !important;
  }

  .ExternalClass .content-td ol li,
  .ExternalClass .content-td ul li {
    padding: 3px 0 !important;
    margin: 0 !important;
  }
  .content-td > :first-child {
    margin-top: 0 !important;
    padding-top: 0 !important;
  }

  .ExternalClass .content-td > :first-child {
    margin-top: 0 !important;
    padding-top: 0 !important;
  }
</style>



<style type="text/css">
  .intercom-align-right {
  text-align: right !important;
}
.intercom-align-center {
  text-align: center !important;
}
.intercom-align-left {
  text-align: left !important;
}
/* Over-ride for RTL */
.right-to-left .intercom-align-right{
  text-align: left !important;
}
.right-to-left .intercom-align-left{
  text-align: right !important;
}
.right-to-left .intercom-align-left {
  text-align:right !important;
}
.right-to-left li {
  text-align:right !important;
  direction: rtl;
}
.right-to-left .intercom-align-left img,
.right-to-left .intercom-align-left .intercom-h2b-button {
  margin-left: 0 !important;
}
.intercom-attachment,
.intercom-attachments,
.intercom-attachments td,
.intercom-attachments th,
.intercom-attachments tr,
.intercom-attachments tbody,
.intercom-attachments .icon,
.intercom-attachments .icon img {
  border: none !important;
  box-shadow: none !important;
  padding: 0 !important;
  margin: 0 !important;
}
.intercom-attachments {
  margin: 10px 0 !important;
}
.intercom-attachments .icon,
.intercom-attachments .icon img {
  width: 16px !important;
  height: 16px !important;
}
.intercom-attachments .icon {
  padding-right: 5px !important;
}
.intercom-attachment {
  display: inline-block !important;
  margin-bottom: 5px !important;
}

.intercom-interblocks-content-card {
  width: 334px !important;
  max-height: 136px !important;
  max-width: 100% !important;
  overflow: hidden !important;
  border-radius: 20px !important;
  font-size: 16px !important;
  border: 1px solid #e0e0e0 !important;
}

.intercom-interblocks-link,
.intercom-interblocks-article-card {
  text-decoration: none !important;
}

.intercom-interblocks-article-icon {
  width: 22.5% !important;
  height: 136px !important;
  float: left !important;
  background-color: #fafafa !important;
  background-repeat: no-repeat !important;
  background-size: 32px !important;
  background-position: center !important;
}

.intercom-interblocks-article-text {
  width: 77.5% !important;
  float: right !important;
  background-color: #fff !important;
}

.intercom-interblocks-link-title,
.intercom-interblocks-article-title {
  color: #519dd4 !important;
  font-size: 15px !important;
  margin: 16px 18px 12px !important;
  line-height: 1.3em !important;
  overflow: hidden !important;
}

.intercom-interblocks-link-description,
.intercom-interblocks-article-body {
  margin: 0 18px 12px !important;
  font-size: 14px !important;
  color: #65757c !important;
  line-height: 1.3em !important;
}

.intercom-interblocks-link-author,
.intercom-interblocks-article-author {
  margin: 10px 15px !important;
  height: 24px !important;
  line-height: normal !important;
}

.intercom-interblocks-link-author-avatar,
.intercom-interblocks-article-author-avatar {
  width: 16px !important;
  height: 16px !important;
  display: inline-block !important;
  vertical-align: middle !important;
  float: left;
  margin-right: 5px;
}

.intercom-interblocks-link-author-avatar-image,
.intercom-interblocks-article-author-avatar-image {
  width: 16px !important;
  height: 16px !important;
  border-radius: 50% !important;
  margin: 0 !important;
  vertical-align: top !important;
  font-size: 12px !important;
}

.intercom-interblocks-link-author-name,
.intercom-interblocks-article-author-name {
  color: #74848b !important;
  margin: 0 0 0 5px !important;
  font-size: 12px !important;
  font-weight: 500 !important;
  overflow: hidden !important;
}

.intercom-interblocks-article-written-by {
  color: #8897a4 !important;
  margin: 1px 0 0 5px !important;
  font-size: 12px !important;
  overflow: hidden !important;
  vertical-align: middle !important;
  float: left !important;
}

</style>
<table cellpadding="0" cellspacing="0" border="0" class="bgtc personal" align="center" style="border-collapse: collapse; line-height: 100% !important; margin: 0;   padding: 0; width: 100% !important; background-color: #f9f9f9;">
    <tbody><tr>
    <td>
    <!--[if (gte mso 10)]>
                                    <tr>
      <td>
      <table style="width: 600px">
                                    <![endif]-->
      <table style="border-collapse: collapse; margin: auto; width: 100%; max-width: 635px; min-width: 320px;  " class="main-wrap">
                                                <tbody><tr>
          <td valign="top">
            <table cellpadding="0" cellspacing="0" border="0" class="reply_header_table" style="border-collapse: collapse; color: #c0c0c0; font-family: 'Helvetica Neue',Arial,sans-serif; font-size: 13px; line-height: 26px; margin: 0 auto 26px;   width: 100%">
            </table>
                                                    </td>
                                                </tr>
        <tr>
          <td valign="top" class="main_wrapper">
                                                
            <table cellpadding="0" cellspacing="0" border="0" class="comment_wrapper_table admin_comment" align="center" style="-webkit-background-clip: padding-box; -webkit-border-radius: 3px; background-clip: padding-box; border-collapse: collapse; border-radius: 3px; color: #545454; font-family: 'Helvetica Neue',Arial,sans-serif; font-size: 13px; line-height: 20px; margin: 0 auto;   width: 100%">
              <tbody><tr>
                <td valign="top" class="comment_wrapper_td">
                  <table cellpadding="0" cellspacing="0" border="0" class="comment_header" style="border-collapse: separate; border: none; font-size: 1px; height: 2px; line-height: 3px;   width: 100%">
                    <tbody><tr>
                      <td valign="top" class="comment_header_td">&nbsp;</td>
                    </tr>
                  </tbody></table>
                  <table cellpadding="0" cellspacing="0" border="0" class="comment_body" style="-webkit-background-clip: padding-box; -webkit-border-radius: 0 0 3px 3px; background-clip: padding-box; border-collapse: collapse; border-color: #dddddd; border-radius: 0 0 3px 3px; border-style: solid; border-width: 0 1px 1px;   width: 100%; border-bottom: none">
                    <tbody><tr>
                      <td class="comment_body_td content-td" style="-webkit-background-clip: padding-box; -webkit-border-radius: 0 0 3px 3px; background-clip: padding-box; border-radius: 0 0 3px 3px; color: #525252; font-family: 'Helvetica Neue',Arial,sans-serif; font-size: 15px; line-height: 22px; overflow: hidden; padding: 40px 40px 30px; background-color: white;">
`;

    static EMAIL_TEMPLATE_FOOTER: string = `
<p>Feel free to reply to this email if you have questions!</p>
</td>
    </tr>
   </tbody></table>
  </td>
 </tr>
</tbody></table>
<table style="width: 100%; border-collapse: collapse; color: #545454; font-family: 'Helvetica Neue',Arial,sans-serif; font-size: 13px; line-height: 20px; margin: 0 auto; max-width: 100%;   width: 100%; letter-spacing: 0.02em; background-color: #f9f9f9;" class="powered-by-table">
    
</table></td></tr></tbody></table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowBlock" style="min-width:100%;">
    <tbody class="mcnFollowBlockOuter">
        <tr>
            <td align="center" valign="top" style="padding:9px" class="mcnFollowBlockInner">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentContainer" style="min-width:100%;">
    <tbody><tr>
        <td align="right" style="padding-left:9px;float:right; padding-right:9px;margin-right:161px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;" class="mcnFollowContent">
                <tbody><tr>
                    <td align="right" valign="top" style="padding-top:9px; padding-right:9px; padding-left:9px; margin-right:">
                        <table align="right" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                                <tr>
                                    <td align="right" valign="top">
                                        <table align="right" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                     
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
<tr>
    <td align="center" valign="top" id="templateFooter" data-template-container>
    
    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
    <tr>
    <td align="center" valign="top" width="600" style="width:600px;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
    <tr>
    <td valign="top" class="footerContainer"></td>
    </tr>
    </table>
    </td>
    </tr>
    </table>
    </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </center>
    </body>
</html>
`;
static EMAIL_FOR_NEW_USER_INVITATION: string = Common.EMAIL_TEMPLATE_HEADER+`
	<h2>You've been invited!</h2>
	<p></p>
	<p>Hi #first_lastname#,</p>
		<p>#loginfullname# invite you on listingreach for post reviews.</p>
		These are your secret weapons:
		<ul>
			<li>Your Account Email: #email#</li>
		</ul> 
		<p></p>
        <p></p>
        <p><a href="`+Common.SITE_URL+`/register?ref=#autotoken#">Post Reference</a> to see the application.</p>
` +Common.EMAIL_TEMPLATE_FOOTER;


static EMAIL_FOR_LOGIN_USER_INVITATION: string = Common.EMAIL_TEMPLATE_HEADER+`
	<h2>You've been invited!</h2>
	<p></p>
	<p>Hi #first_lastname#,</p>
	<p>#loginfullname# invite you on listingreach for post reviews.</p>	
		These are your secret weapons:
		<ul>
			<li>Your Account Email: #email#</li>
		</ul> 
		<p></p>
        <p></p>
        <p><a href="`+Common.SITE_URL+`/login?ref=#autotoken#">Post Reference</a> to see the application.</p>
` +Common.EMAIL_TEMPLATE_FOOTER;



static PREVIEW_EMAIL_TEMPLATE_HEADER:string =`<!DOCTYPE html>
<html>
   <head>
      <meta charset='UTF-8'>
      <style>
	
      </style>
   </head>
   <body>
      <div class="blast-box" style=" max-width: 100%;
         background: #fff;
         font-family: 'Poppins', sans-serif;
         margin: auto;
         color: #555555;
         font-size: 1rem;
         font-weight: 400;
         line-height: 1.5;
         padding: 30px;display: block;">
         <div class="row" style="display: block;display: flex;flex-wrap: wrap;">
            <div style="display: block;width:66%;margin: auto;">
               <div class="border2" style="display: block;border: 3px solid #eee;">
                  <div class="row" style="display: block;display: flex;flex-wrap: wrap;">
                     <div class="mb-3 mt-3 text-right" style="display: block;width:30%;text-align: right !important; margin-bottom: 1rem !important;margin-top: 1rem !important;text-align: right !important;">					 
                        <label style="display: inline-block;
         margin-bottom: 0.5rem;">From:	</label>
                     </div>
                     <div style="display: block;width:66%;margin-bottom: 1rem !important; margin-left: 1rem !important;margin-top: 1rem !important;" class="mb-3 mt-3 ml-3">
                        Vinod via Listingreach.com
                     </div>
                     <div class="mb-3 text-right" style="display: block;width:30%;text-align: right !important;margin-bottom: 1rem !important;text-align: right !important;">					 
                        <label style="display: inline-block;
         margin-bottom: 0.5rem;">Email Subject Line: #subject#</label>
                     </div>
                     <div class="mb-3 ml-3" style="width:66%; margin-left: 1rem !important;">
                        #formLine#
                     </div>
                  </div>
               </div>
               <div class="border3" style=" border: 3px solid #eee;
         border-top: 0;">
                  <div class="row" style="display: flex;flex-wrap: wrap;">
                     <div class="mb-3 mt-3 ml-3" style="width:41%;margin-bottom: 1rem !important; margin-left: 1rem !important;margin-top: 1rem !important;">					 
                        <i>Powered by</i>	<br>
                        <img src="http://66.235.194.119/listingreach/img/listing-reach-logo.png" alt="" class="img-a img-fluid">
                     </div>
                     <div class="mb-3 mt-3 text-right" style="width:25%;text-align: right !important;margin-bottom: 1rem !important;margin-top: 1rem !important;text-align: right !important;">
                        <button class="btn btn-primary" style="background-color: #EE8C3A;
         border: #EE8C3A;
         color:#fff;display: inline-block;
         font-weight: 400;
         text-align: center;
         white-space: nowrap;
         vertical-align: middle;
         -webkit-user-select: none;
         -moz-user-select: none;
         -ms-user-select: none;
         user-select: none;
         padding: 0.375rem 0.75rem;
         font-size: 1rem;
         line-height: 1.5;
         border-radius: 0.25rem;
         box-shadow 0.15s ease-in-out;">Reply to Sender</button>
                     </div>
                     <div class="mb-3 mt-3 text-right ml-3" style="width:25%;text-align: right !important;margin-bottom: 1rem !important; margin-left: 1rem !important;margin-top: 1rem !important;text-align: right !important;">
                        <button class="btn btn-primary" style="background-color: #EE8C3A;
         border: #EE8C3A;
         color:#fff;display: inline-block;
         font-weight: 400;
         text-align: center;
         white-space: nowrap;
         vertical-align: middle;
         -webkit-user-select: none;
         -moz-user-select: none;
         -ms-user-select: none;
         user-select: none;
         padding: 0.375rem 0.75rem;
         font-size: 1rem;
         line-height: 1.5;
         border-radius: 0.25rem;
         box-shadow 0.15s ease-in-out;">Forward to Associate</button>
                     </div>
                  </div>`;
static PREVIEW_EMAIL_TEMPLATE_FOOTER:string =`<div class="flyer-footer">
                     <div class="row mt-3" style="margin-top: 1rem !important; display: flex;flex-wrap: wrap;">
                        <div class="text-center" style="width:16%;text-align: center !important;">
                           <img alt="Photo" class="img-square" style="width:100px;" src="http://66.235.194.119/listingreach/img/dummy-logo.png">
                        </div>
                        <div class="text-center" style="width:66%;text-align: center !important;">
                           <b> Vinod</b><br>
                           Manager<br>
                           vinod@gmail.com<br>
                           http://www.website.com<br>
                           21212121212<br><br>
                           Agent Other Contacts Details will come here: (Optional)<br><br>
                           Company Details will come here,<br>
                           Company name<br>
                           Company Address, Mai Phone Number, Company Website, etc.
                        </div>
                        <div class="text-center pl-0" style="width:16%;text-align: center !important;">
                           <img alt="Photo" class="img-circle" style="width:100px;" src="http://66.235.194.119/listingreach/img/dummy-profile.png">
                        </div>
                     </div>
                  </div>
                  <div class="flyer-btm" style="background: #8c8c8c;
         padding: 10px;
         font-size: 0.8rem;
         color: #fff;
         margin-top: 10px;">
                     <div class="row" style="display: flex;flex-wrap: wrap;">
                        <div style="width:100%">
                           This e-blast was delivered by ListingReach.com, a real estate email marketing service. The ListingReach.com service and information provided therein, while believed to be accurate, are provided "as is". ListingReach.com disclaims any and all representations, warranties, or guarantees of any kind. ListingReach.com assumes no liability for errors or omissions.
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </body>
</html> `;						





static PREVIEW_EMAIL_MULTIPROPERTY_TEMPLATE:string= Common.PREVIEW_EMAIL_TEMPLATE_HEADER+`
<p>#multiproperty#</p>
`+ Common.PREVIEW_EMAIL_TEMPLATE_FOOTER;

static PREVIEW_EMAIL_TEMPLATE:string =  ` 
                  <div class="row" style="display: flex;flex-wrap: wrap;">
                     <div style="width:100%">
                        <div class="flyer-header" style="display: block;overflow: hidden;
         background-color: #EE8C3A;
         color: #fff;
         box-shadow: 0 2px rgba(17, 16, 15, 0.1), 0 2px 10px rgba(20, 19, 18, 0.1);
         border-top: 4px solid #EE8C3A;
         height: 80px;
         text-align: center;
         font-size: 28px;
         font-weight: bold;
         padding: 17px 0 10px 0;">					 
                           #blastHeadline#
                        </div>
                     </div>
                  </div>
                  <div class="row" style="display: block;display: flex;flex-wrap: wrap;">
                     <div style="width:100%;display: block;">
                        <img src="http://66.235.194.119/listingreach/img/img1.jpg" alt="image" style="width:100%;height: 400px;">
                     </div>
                  </div>
                  <div class="flyer-bg" style="background: #f1f1f1;border-bottom: 2px solid #ccc;">
                     <div class="row" style="display: flex;flex-wrap: wrap;">
                        <div class="mt-3 mb-3 ml-3" style="width:100%;margin-bottom: 1rem !important; margin-left: 1rem !important;margin-top: 1rem !important;">
                           <h4 style=" background: #f1f1f1;border-bottom: 2px solid #ccc;font-size: 1.5rem;">Price: $#pricePerSquareFoot# per Square Foot</h4>
                        </div>
                     </div>
                     <div class="row" style="">
                        <div class="mt-3 text-center" style="width:100%;margin-top: 1rem !important;text-align: center !important;">
                           <label class="flyer-label" style="color: #EE8C3A;
         font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">Property Address:</label>
                           <p>#streetAddress#, #city#, #zipCode#</p>
                        </div>
                        <div class="text-center" style="width:100%;text-align: center !important;">
                           #openData#
                        </div>
                        <hr>
                        <div class="ml-3" style="width:100%; margin-left: 1rem !important;">
                           <label class="flyer-label" style="color: #EE8C3A;
         font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">MLS#:</label>
                           <span>#mlsNumber#</span>
                        </div>
                        <div class="ml-3" style="width:100%; margin-left: 1rem !important;">
                           <label class="flyer-label" style="color: #EE8C3A;
         font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">Property Description:</label>
                           <span>Property details will come here...</span>				  
                        </div>
                        <div class="ml-3" style="width:100%; margin-left: 1rem !important;">
                           <label class="flyer-label" style="color: #EE8C3A;
         font-size: 1rem;display: inline-block;margin-bottom: 0.5rem;">Key Features:</label>
                           <ul>
                               <li>Property Type: #propertyType# </li>
								<li>Property Style: #propertyStyle# </li>  
								<li> #numberOfBedrooms# Bedrooms</li>
								<li>#full# Full #half# Half Bathrooms</li>
								<li>500 square feet</li>

								<li>$111,000.00 /sqft</li>
								<li>Lot Size: #lotSize# sqft</li>
								<li>  Built #yearBuilt#</li>
								<li> #numberOfStories# </li>
								<li>Garage: #garageSize# </li>
                           </ul>
                        </div>
                        <div class="ml-3" style="width:100%; margin-left: 1rem !important;">
                          #links#
                        </div>
                        <div class="text-center" style="width:100%;text-align: center !important;">
                           <h4 style=" background: #f1f1f1;
         border-bottom: 2px solid #ccc;"><a href="http://66.235.194.119/listingreach" style="color: #000000;transition: all .5s ease;"><u>Click Here to Email Agent for More Information</u></a></h4>
                        </div>
                     </div>
                  </div>`;





static CONTACT_FORM:string = Common.EMAIL_TEMPLATE_HEADER+`
    <h1>Contact form </h1>
<ul>
  <li>Name: #fullname#</li>
  <li>Email: #email#</li>
  <li>Phone: #phone#</li>
  <li>Message: #message#</li>
  <li>Date:#date#</li>
</ul>
<p>Thank you for using listingreach</p>      
`+Common.EMAIL_TEMPLATE_FOOTER;


static EMAIL_TEMPLATE_RESET_USER_PASSWORD: string = Common.EMAIL_TEMPLATE_HEADER+`
    <h1>Forgot your password? Let's get you a new one.</h1>
        <p>We got a request to change the password for your account.</p>
<p>Here is your new one:</p>
<ul>
  <li>Temporary Password: #password#</li>
</ul>
<p>To change your temporary password, please go to Settings &gt; My Account and choose a new password that is easy to remember.</p>
<p>Thank you for using Listingreach.</p>  
<p><a href="`+Common.SITE_URL+`/login">Login Now</a> to see the application.</p>          
`+Common.EMAIL_TEMPLATE_FOOTER;

static EMAIL_TEMPLATE_RESET_ADMIN_PASSWORD: string = Common.EMAIL_TEMPLATE_HEADER+`
    <h1>Forgot your password? Let's get you a new one.</h1>
        <p>We got a request to change the password for your account.</p>
<p>Here is your new one:</p>
<ul>
  <li>Temporary Password: #password#</li>
</ul>
<p>To change your temporary password, please go to Settings &gt; My Account and choose a new password that is easy to remember.</p>
<p>Thank you for using Listingreach.</p>  
<p><a href="`+Common.SITE_URL+`/#/admin/login">Admin Login Now</a> to see the application.</p>          
`+Common.EMAIL_TEMPLATE_FOOTER;
static SIGNUP_EMAIL_TEMPLATE_TO_REGISTERED_USER: string = Common.EMAIL_TEMPLATE_HEADER+`
    <h2>Congrats for setting up your account on Listingreach</h2><br/><br/>
    Here are your login details:  <br/>
    <b></b><br/>
    <ul>
    <li>Your account Email: #email#</li>
    <li>Your account Password: #password#</li>
    <li>Subscription Type: Always Free</li>
    </ul>
    <b></b><br/>
    For any questions, please contact us  at <br/><br/>
    Best Regards,<br/>
    The Listingreach Team
<p></p>
<p></p>
<p><a href="`+Common.SITE_URL+`/login">Click here to login to your account.</a></p>
`+Common.EMAIL_TEMPLATE_FOOTER;

static SIGNUP_EMAIL_TEMPLATE_TO_REGISTERED_ADMIN: string = Common.EMAIL_TEMPLATE_HEADER+`
    Here are the details of your new registered company: <br/>
    <b></b><br/>
    <ul>
    <li>Name: #name#</li>
    <li>Email: #email#</li>
    <li>Company: #companyName#</li>
    <li>Subscription: Free</li>
    </ul>
    <b></b><br/>
    Best Regards,<br/>
    The Inteleagent Team
<p></p>
<p></p>
<p><a href="`+Common.SITE_URL+`/#/login">Click here to login to your account.</a></p>
`+Common.EMAIL_TEMPLATE_FOOTER;
static sendMailWithAttachment(to: string,from: string, subject: string, message: string, html: string,attachmentfilename: string, 
						attachmentfilepath: string, callback:any): void {
        console.log('sending mail');
		console.log('Common.SEND_FROM_EMAIL : ',Common.SEND_FROM_EMAIL);
        var mailOptions={
            to : to,
            from : Common.SEND_FROM_EMAIL,
            subject : subject,
            text :  message,
            html: html,
			attachments: [
			{   // utf-8 string as an attachment
				filename: attachmentfilename,
				 path: attachmentfilepath
			}]
        }
        var smtpTransport = nodemailer.createTransport(Common.MAIL_CONFIG);
        smtpTransport.sendMail(mailOptions, callback);
    }

    static sendMail(to: string,from: string, subject: string, message: string, html: string, callback:any): void {
        console.log('sending application for subject ',subject);
		console.log('Common.SEND_FROM_EMAIL : ',Common.SEND_FROM_EMAIL);
        var mailOptions={
            to : to,
            from : Common.SEND_FROM_EMAIL,
            subject : subject,
            text :  message,
            html: html,
		}
        var smtpTransport = nodemailer.createTransport(Common.MAIL_CONFIG);
        var mailsent = smtpTransport.sendMail(mailOptions, callback);
        console.log('Check Mail Sent: ',mailsent);
        if(mailsent){
        	console.log('mailsent: ',mailsent);
        }
    }
}
Object.seal(Common);
export = Common;
