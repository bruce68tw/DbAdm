(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var import_FunEstr = __toESM(require("@base/enum/FunEstr"));
  var import_MouseEstr = __toESM(require("@base/enum/MouseEstr"));
  var import_CrudR = __toESM(require("@base/svc/CrudR"));
  var import_EditOne = __toESM(require("@base/svc/EditOne"));
  var import_EditMany = __toESM(require("@base/svc/EditMany"));
  var import_EditDto = __toESM(require("@base/dto/EditDto"));
  var import_Ajax = __toESM(require("@base/svc/_Ajax"));
  var import_Array = __toESM(require("@base/svc/_Array"));
  var import_Form = __toESM(require("@base/svc/_Form"));
  var import_Fun = __toESM(require("@base/svc/_Fun"));
  var import_iCheck = __toESM(require("@base/svc/_iCheck"));
  var import_iSelect = __toESM(require("@base/svc/_iSelect"));
  var import_iText = __toESM(require("@base/svc/_iText"));
  var import_Json = __toESM(require("@base/svc/_Json"));
  var import_Modal = __toESM(require("@base/svc/_Modal"));
  var import_Nav = __toESM(require("@base/svc/_Nav"));
  var import_Obj = __toESM(require("@base/svc/_Obj"));
  var import_Prog = __toESM(require("@base/svc/_Prog"));
  var import_Str = __toESM(require("@base/svc/_Str"));
  var import_Tab = __toESM(require("@base/svc/_Tab"));
  var import_Tool = __toESM(require("@base/svc/_Tool"));
  var import_Valid = __toESM(require("@base/svc/_Valid"));
})();
//# sourceMappingURL=GenCrud.js.map
