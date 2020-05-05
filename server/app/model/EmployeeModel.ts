/**
 * Employe model
 */

import mongoose = require("mongoose");

import IEmployeeModel = require('./interfaces/IEmployeeModel');

class EmployeeModel {

    private _employeeModel : IEmployeeModel;

    constructor(EmployeeModel: IEmployeeModel) {
        this._employeeModel = EmployeeModel;
    }
    get _id (): mongoose.Types.ObjectId {
        return this._employeeModel._id;
    }
    get userId (): string {
        return this._employeeModel.userId;
    }
    get gender():string{
        return this._employeeModel.gender;
    }
    get dateofBirth (): Date {
        return this._employeeModel.dateofBirth;
    }
    get summary (): string {
        return this._employeeModel.summary;
    }
    get social_media():object{
        return this._employeeModel.social_media;
    }
    get defoultsocial_media():object{
        return this._employeeModel.defoultsocial_media;
    }
    get currentlyEmployed():object{
        return this._employeeModel.defoultsocial_media;
    }
    get professionalSummary (): object {
        return this._employeeModel.professionalSummary;
    }
    get currentsalaryflag():string{
        return this._employeeModel.currentsalaryflag;
    }
    get expectedsalaryflag():string{
        return this._employeeModel.expectedsalaryflag;
    }
    get permanentaddressFlag():string{
        return this._employeeModel.permanentaddressFlag;
    }
    get currentSalary():string{
        return this._employeeModel.currentSalary;
    }
    get expectedSalary():string{
        return this._employeeModel.expectedSalary;
    }
    get currentlyEmployed():string{
        return this._employeeModel.currentlyEmployed;
    }
    get openRelocation():string{
        return this._employeeModel.openRelocation;
    }
    get openTravel():string{
        return this._employeeModel.openTravel;
    }
    get authorization():string{
        return this._employeeModel.authorization;
    }
    get felony():string{
        return this._employeeModel.felony;
    }
    get experienceYear():string{
        return this._employeeModel.experienceYear;
    }
    get experienceMonth():string{
        return this._employeeModel.experienceMonth;
    }
    get phone (): string {
        return this._employeeModel.phone;
    }
    get alternateMobile_number (): string {
        return this._employeeModel.alternateMobile_number;
    }
    get alternateEmail (): string {
        return this._employeeModel.alternateEmail;
    }
    get education (): object {
        return this._employeeModel.education;
    }
    
    get skills (): object {
        return this._employeeModel.skills;
    }
    
    get strengths (): string {
        return this._employeeModel.strengths;
    }
    
     get improvements (): string {
        return this._employeeModel.improvements;
    }
    
    get profileCover (): string {
        return this._employeeModel.profileCover;
    }

    get designation (): string {
        return this._employeeModel.designation;
    }

    get profilePic (): string {
        return this._employeeModel.profilePic;
    }
    get currentaddress(): object {
        return this._employeeModel.currentaddress;
    }
    get permanentaddress(): object{
        return this._employeeModel.permanentaddress;
    }
    
    get resume (): string {
        return this._employeeModel.resume;
    }
    get totaloverall (): string {
        return this._employeeModel.totaloverall;
    }
    get createdDate (): Date {
        return this._employeeModel.createdDate;
    }
	get updatedDate (): Date {
        return this._employeeModel.updatedDate;
    }
}
Object.seal(EmployeeModel);
export =  EmployeeModel;

