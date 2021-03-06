import ISendInBlueBusiness = require("./../business/interfaces/ISendInBlueBusiness");

var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = "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"
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apiKey.apiKeyPrefix['api-key'] = "Token"

// Configure API key authorization: partner-key
var partnerKey = defaultClient.authentications['partner-key'];
partnerKey.apiKey = "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"
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//partnerKey.apiKeyPrefix['partner-key'] = "Token"

//var contactsApi = new SibApiV3Sdk.ContactsApi();
// api.getAccount().then(function (data) {
//   console.log('API called successfully. Returned data: ' + data);
// }, function (error) {
//   console.error(error);
// });

class SendInBlueBusiness {
  constructor() {
  }
  async createContact(subscriber: any): Promise<any> {
    console.log("Creting Contact on Send In Blue ", subscriber);
    var apiInstance = new SibApiV3Sdk.ContactsApi();
    var createContact = new SibApiV3Sdk.CreateContact(); // CreateContact | Values to create a contact
    createContact.email = subscriber.email;
    var pricepoints = "";
    subscriber.priceRanges.forEach((price: any) => {
      pricepoints += price.text + ",";
    });
    pricepoints = pricepoints.replace(/,\s*$/, ""); // remove comma at the end
    createContact.attributes = {
      FIRSTNAME: subscriber.name,
      PHONE: subscriber.phone,
      CITY: subscriber.city,
      STATE: subscriber.state,
      PRICEPOINTS: pricepoints,
      INCLUDEOUTSIDEAREAPROPERTIES: subscriber && subscriber.includeOutsideAreaProperties,
      INCLUDERENTEDPROPERTIES: subscriber && subscriber.includeRentedProperties,
      PREFERREDVENDORS: subscriber.agentTypes.toString(),
      PROPERTYTYPES: subscriber.propertyTypes.toString()
    }
    var listids: any[] = []
    subscriber.mailingLists.forEach((list: any) => {
      listids.push(list.id);
    });
    createContact.listIds = listids;
    apiInstance.createContact(createContact).then(function (data: any) {
      console.log('Contact Created successfully. Returned data: ', data);
    }, function (error: any) {
      console.error(error);
    });
  }

  async createFolderIfDoesNotExist(folderName: string): Promise<any> {
    console.log("Folder name : ", folderName);
    var apiInstance = new SibApiV3Sdk.ContactsApi();
    var folders: any[] = await this.getAllFolfers();
    if (folders && folders.length > 0) {
      var existingfolder = folders.find((f: any) => f.name == folderName);
      //  console.log("existing ", existingfolder);
      if (existingfolder) {
        console.log("folder already exists ", existingfolder);
        return existingfolder;
      }
    }

    var createFolder = new SibApiV3Sdk.CreateUpdateFolder(); // CreateUpdateFolder | Name of the folder     
    createFolder.name = folderName;
    apiInstance.createFolder(createFolder).then(function (data: any) {
      console.log('Folder Created. Returned data: ', data);
      return data;
    }, function (error: any) {
      console.error(error);
    });
  }

  async getAllFolfers() {
    var apiInstance = new SibApiV3Sdk.ContactsApi();
    var folders: any[] = [];
    var limit = 10; // Number | Number of documents per page
    let offset = 0; // Number | Index of the first document of the page
    let count = 0;
    do {
      console.log("Loop... count " + limit + " offset " + offset);
      await apiInstance.getFolders(limit, offset).then(function (data: any) {
        //  console.log('API called successfully. Returned data: ', data);
        count = data.folders.length;
        data.folders.forEach((folder: any) => {
          folders.push(folder);
        });
        //   console.log(folders);
        offset += 10;
      }, function (error: any) {
        console.error(error);
        count = 0;
      });
    } while (count > 0);
    return folders;
  }
  async getAllLists() {
    var apiInstance = new SibApiV3Sdk.ContactsApi();
    var lists: any[] = [];
    var opts = {
      limit: 10, // Number | Number of documents per page
      offset: 0 // Number | Index of the first document of the page
    };
    let count = 0;
    do {
    //  console.log("Loop... count " + count + " offset " + opts.offset);
      await apiInstance.getLists(opts).then(function (data: any) {
        console.log(' Returned Lists: ', data.count);
       // console.log("first id ", data.lists[0].id);
        count = data.lists.length;
        if (count < opts.limit) {
          count = 0;
        }
        data.lists.forEach((List: any) => {
          lists.push(List);
        });
        //   console.log(folders);
        opts.offset += 10;
      }, function (error: any) {
        console.error(error);
        count = 0;
      });
    } while (count > 0);
    return lists;
  }

  async createList(folderName: string, listName: string) {
    var sendiBlueInstance = this;
    sendiBlueInstance.createFolderIfDoesNotExist(folderName).then(async function (folder: any) {
      console.log("folder ... ", folder);
      sendiBlueInstance.createListIfDoesNotExist(folder.id, listName).then(async function (data: any) {
        console.log('API called successfully. Returned data: ', data);
      }, function (error: any) {
        console.error(error);
      });
    });
  }

  async createListIfDoesNotExist(folderId: number, listName: string): Promise<any> {
    //  console.log("List name : ", listName);
    var apiInstance = new SibApiV3Sdk.ContactsApi();
    var lists: any[] = await this.getAllLists();
    if (lists && lists.length > 0) {
      var existingList = lists.find((f: any) => f.name == listName);
      //  console.log("existing ", existingfolder);
      if (existingList) {
        // console.log("folder already exists ", existingList);
        return existingList;
      }
    }

    var createList = new SibApiV3Sdk.CreateList(); // CreateUpdateFolder | Name of the folder     
    createList.name = listName
    createList.folderId = folderId;
    apiInstance.createList(createList).then(function (data: any) {
      //  console.log('List Created. Returned data: ', data);
      return data;
    }, function (error: any) {
      console.error(error);
    });
  }
  async createCampaign(campaign: any): Promise<any> {
    var apiInstance = new SibApiV3Sdk.EmailCampaignsApi();
    var emailCampaigns = new SibApiV3Sdk.CreateEmailCampaign();
    emailCampaigns = campaign;
    // CreateEmailCampaign | Values to create a campaign
    return apiInstance.createEmailCampaign(emailCampaigns);
  }
  async getAllSenders() {
    var apiInstance = new SibApiV3Sdk.SendersApi();
    var senders: any[] = [];
    var limit = 10; // Number | Number of documents per page
    var offset = 0; // Number | Index of the first document of the page
    let count = 0;
    do {
      console.log("Loop... count " + count + " offset " + offset);
      await apiInstance.getSenders(limit, offset).then(function (data: any) {
        console.log(' Returned Lists: ', data);
        count = data.senders.length;
        if (count < limit) {
          count = 0;
        }
        data.senders.forEach((List: any) => {
          senders.push(List);
        });
        //   console.log(folders);
        offset += 10;
      }, function (error: any) {
        console.error(error);
        count = 0;
      });
    } while (count > 0);
    return senders;
  }
  async createSender(sender: any): Promise<any> {
    var apiInstance = new SibApiV3Sdk.SendersApi();
    var lists: any[] = await this.getAllSenders();
    if (lists && lists.length > 0) {
      var existinSender = lists.find((f: any) => f.name == sender.name && f.email == sender.email);
      //  console.log("existing ", existingfolder);
      if (existinSender) {
        console.log("sender already exists ", existinSender);
        return existinSender;
      }
    }
    var Sender = new SibApiV3Sdk.CreateSender() // CreateSender | sender's name
    Sender = sender;
    var opts = {
      'sender': Sender
    };
    apiInstance.createSender(opts).then(function (data: any) {
      console.log('Sender Created : ');
    }, function (error: any) {
      console.error(error);
    });
  }

}
Object.seal(SendInBlueBusiness);
export = SendInBlueBusiness;