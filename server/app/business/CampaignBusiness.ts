import Common = require("./../../config/constants/common");
const request = require('request');
const querystring = require('querystring');
class CampaignBusiness {
    constructor() {

    }
    createActiveCampaignMessage(): any {
        
        try {
            var data = querystring.stringify({
                api_action: "message_add",
                api_key: Common.ActiveCampaignLey,
                api_output: 'json',
                format: "html",
                subject: "TEst From API",
                fromemail: "gurpreet76east@outlook.com",
                fromname: "GS",
                reply2: "gurpreet76east@outlook.com",
                priority: "3",
                charset: "utf-8",
                encoding: "UTF-8",
                htmlconstructor: "editor",
                html: "<h1> Hello this is Test Mail</h1>",
                htmlfetch: "https;//test.com",
                htmlfetchwhen: "send",
                textconstructor: "editor",
                text: "Yo ho",
                textfetch: "https;//test.com",
                textfetchwhen: "send",
                "p[]": 6
            });
            var headers = {
                'Content-Length': data.Length,
                'Content-Type': 'application/x-www-form-urlencoded'
            };
            request.post(Common.ActiveCampaignUrl + "", {
                headers: headers,
                body: data
            }, function (er: any, response: { statusCode: number; }, body: any) {
                return { body, er, response };
            });
        }
        catch (e) {
            console.log("Exception : ",e);
            return { er: e };
        }
    }
    createActiveCampaignCampaign(): any {
        try {
            var data = querystring.stringify({
                api_action: "campaign_create",
                api_key: Common.ActiveCampaignLey,
                api_output: 'json',
                type: "single",
                name: "Test Campaign 76East",
                sdate: "2020-05-23 1:25:00 AM",
                status: "1",
                public: "1",
                priority: 3,
                "p[6]": 6,
                "m[69]": 100
            });
            var headers = {
                'Content-Length': data.Length,
                'Content-Type': 'application/x-www-form-urlencoded'
            };
            request.post(Common.ActiveCampaignUrl + "", {
                headers: headers,
                body: data
            }, function (er: any, response: {
                statusCode: number;
            }, body: any) {
                return { body, er, response };
            });
        }
        catch (e) {
            return { er: e };
        }
    }
}


Object.seal(CampaignBusiness);
export = CampaignBusiness;