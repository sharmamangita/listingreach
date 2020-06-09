import { userConstants } from "../constants";
import objectAssign from "object-assign";

export function users(state = {}, action) {
  let newState;

  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      newState = objectAssign({}, state, {
        loading: true,
      });
      return newState;
    case userConstants.GETALL_SUCCESS:
      newState = objectAssign({}, state, {
        items: action.users,
        saveBlastData: action.users
      });
      return newState;
    case userConstants.GETSAVEDALL_SUCCESS:
      newState = objectAssign({}, state, {
        saveditems: action.users,
      });
      return newState;
    case userConstants.UPDATE_SUCCESS:
      newState = objectAssign({}, state, {
        loading: true,
        profile: action.users.user,
      });
      return newState;

    case userConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case userConstants.GETBYID_REQUEST:
      newState = objectAssign({}, state, {
        loading: true,
      });
      return newState;
    case userConstants.GETBYID_SUCCESS:
      newState = objectAssign({}, state, {
        loading: true,
        profile: action.user.data.userData[0],
        agentData: action.user.data.agentData[0],
        imageData: action.user.data.imageData,
      });
      return newState;

    case userConstants.GETBYID_FAILURE:
      return {
        error: action.error,
      };
    case userConstants.UPDATESAVED_SUCCESS:
      newState = objectAssign({}, state);
      return newState;

    case userConstants.GETREVIEW_REQUEST:
      newState = objectAssign({}, state, {
        loading: true,
      });
      return newState;

    case userConstants.REVIEWUPDATE_SUCCESS:
      newState = objectAssign({}, state);
      return newState;

    case userConstants.REVIEW_FAILURE:
      return {
        error: action.error,
      };

    case userConstants.AGENT_DATABASE_REQUEST:
      newState = objectAssign({}, state, {
        loading: true,
      });
      return newState;

    case userConstants.AGENT_DATABASE_SUCCESS:
      newState = objectAssign({}, state, {
        loading: true,
        agentData: action.agentDatabase,
      });
      return newState;

    case userConstants.AGENT_DATABASE_FAILURE:
      return {
        error: action.error,
      };

    case userConstants.GET_BLAST_REQUEST:
      newState = objectAssign({}, state, {
        loading: true,
      });
      return newState;

    case userConstants.GET_BLAST_SUCCESS:
      newState = objectAssign({}, state, {
        loading: true,
        blast: action.blast,
      });
      return newState;

    case userConstants.GET_BLAST_FAILURE:
      return {
        error: action.error,
      };

    case userConstants.BLAST_SUCCESS:
      newState = objectAssign({}, state, {
        tab: "designTemplateTab"
      });
      return newState;

    case userConstants.DESIGNTEMPLATE_SUCCESS:
      newState = objectAssign({}, state, {
        tab: "property",
        templateName: action.users,
      });
      return newState;

    case userConstants.SELECTDATABASE_SUCCESS:
      newState = objectAssign({}, state, {
        tab: "setDate",
      });
      return newState;

    case userConstants.SELECTSETDATE_SUCCESS:
      newState = objectAssign({}, state, {
        tab: "terms",
        scheduledDate: action.users.data,
        blastsettingData: action.users.blastsettingData,
        dataBaseData: action.users.dataBaseData
      });
      return newState;

    case userConstants.PREVIEW_REQUEST:
      newState = objectAssign({}, state, {
        tab: "selectdatabase",
      });
      return newState;

    case userConstants.PROPERTY_SUCCESS:
      let tab = '';
      if (action.users && action.users.template) {
        if (action.users.template.template_type == "UploadBlast" || action.users.template.template_type == "UploadYourOwnBlast") {
          tab = "preview";
        } else {
          tab = "photo";
        }
        newState = objectAssign({}, state, {
          tab: tab
        });
        return newState;
      }


    case userConstants.SAVEIMAGES_SUCCESS:
      newState = objectAssign({}, state, {
        propertyImages: action.users
      });
      return newState;

    case userConstants.GETPREVIEW_SUCCESS:
      newState = objectAssign({}, state, {
        previewHtml: action.HTML.html
      });
      return newState;




    case userConstants.TERMS_REQUEST:
      newState = objectAssign({}, state, {
        tab: "payment",
      });
      return newState;


    case userConstants.SAVEDBLAST_SUCCESS:
      newState = objectAssign({}, state, {
        loading: true,
        savedBlast: action.user,
      });
      return newState;


    case userConstants.GETDOWNLOADEDALL_REQUEST:
      return {
        loading: true,
      };


    case userConstants.GETBYPAYMENTID_SUCCESS:
      newState = objectAssign({}, state, {
        loading: true,
        payment: action.users.payment,
      });
      return newState;
    case userConstants.GETBYPAYMENTID_FAILURE:
      return {
        error: action.error,
      };
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        loading: true,
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter((user) => user.id !== action.id),
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map((user) => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        }),
      };

    default:
      return state;
  }
}
