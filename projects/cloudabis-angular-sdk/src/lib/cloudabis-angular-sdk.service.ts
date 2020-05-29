import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class CloudabisAngularSdkService {

  constructor() { }

  /**
   * Returns API token object if given app key, secret key is correct otherwise return the proper reason
   */
  public getToken(config){
    var requestData = {
      username: config.CloudABISAppKey,
      password: config.CloudABISSecretKey,
      grant_type: "password"
    }

    return new Promise((resolve, reject) => {
      $.ajax({
        url: config.CloudABIS_API_URL + 'token',
        type: 'POST',
        data: requestData,
        success: function(data) {
          resolve(data)
        },
        error: function(error) {
          reject(error)
        },
      });
    });
  }

  /// <summary>
  /// Determine if a member ID already has biometric data enrolled.
  /// <para>Operation-specific OperationResult values:</para>
  /// <br>IsRegistered: YES - There is biometric data enrolled with the requested Member ID.</br>
  /// <br>IsRegistered: NO - There is not any biometric data enrolled with the requested ID.</br>
  /// <para>General OperationResult values:</para>
  /// <br>CUSTOMER_INFO_NOT_FOUND: The specified CustomerKey was not found in the system. Please contat your vendor for assistance.</br>
  /// <br>INVALID_ENGINE: The specified EngineName was not valid.</br>
  /// <br>INVALID_REQUEST: The submitted request was not correctly formatted.</br>
  /// <br>LICENSE_ERROR: A system license limitation prevented your request from being fulfilled. Please contact your vendor for assistance.</br>
  /// <br>INTERNAL_ERROR: An unexpected system error was encountered. Please contact your vendor for assistance.</br>
  /// <br>CACHE_NOT_AVAILABLE: The requested record is not available in the system. Please contact your vendor for assistance.</br>
  /// </summary>
  /// <param name="CustomerKey">Customer-specific key provided by the vendor.</param>
  /// <param name="EngineName">The engine name for fingerprint biometrics is "FPFF02". The engine name for fingervein biometrics is "FVHT01"The engine name for face biometrics is "FACE01".The engine name for iris biometrics is "IRIS01".</param>
  /// <param name="RegistrationID">The unique identifier (Member ID) of the biometric enrollment that the requested operation will be performed on.</param>
  /// <param name="Token">API authenticate token</param>
  /// <returns></returns>
  public IsRegister(CloudABISBiometricRequest){
    return new Promise((resolve, reject) => {
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": CloudABISBiometricRequest.config.CloudABIS_API_URL + 'api/Biometric/IsRegistered',
        "method": "POST",
        "type": "POST",
        "headers": {
          "authorization": 'Bearer ' + CloudABISBiometricRequest.token,
          "content-type": "application/json",
          "cache-control": "no-cache",
          "postman-token": "79dfe13a-756b-80cc-3515-6af6b83b25a9"
        },
        "data": '{\r\n  "CustomerKey": "'+CloudABISBiometricRequest.config.CloudABISCustomerKey+'",\r\n  "EngineName": "'+CloudABISBiometricRequest.config.ENGINE_NAME+'",\r\n  "RegistrationID": "'+CloudABISBiometricRequest.registrationID+'"\r\n}'
      }
      
      $.ajax(settings).done(function(response) {
        resolve(response);
      }).fail(function(err){
        reject(err);
      });
    });
  }

  /// <summary>
  /// Enroll a member's biometric data.
  /// <para>Operation-specific OperationResult values:</para>
  /// <br>Register: SUCCESS - Enrollment successful. (The Member ID and associated biometric data added to system.)</br>
  /// <br>Register: FAILED - Enrollment failed.</br>
  /// <br>IsRegistered: YES - There is biometric data enrolled with the requested Member ID.</br>
  /// <br>Register: POOR_IMAGE_QUALITY - The submitted iris image(s) were not good enough quality to fulfill the request.</br>
  /// <br>Identify: MATCH_FOUND - Match found. (The submitted biometric data matched that of an enrolled member.)</br>
  /// <para>General OperationResult values(FingerVein,Face,Iris):</para>
  /// <br>INVALID_TEMPLATE: The submitted BiometricXml was not correctly formatted.</br>
  /// <br>CUSTOMER_INFO_NOT_FOUND: The specified CustomerKey was not found in the system.Please contat your vendor for assistance.</br>
  /// <br>INVALID_ENGINE: The specified EngineName was not valid.</br>
  /// <br>INVALID_REQUEST: The submitted request was not correctly formatted.</br>
  /// <br>LICENSE_ERROR: A system license limitation prevented your request from being fulfilled. Please contact your vendor for assistance.</br>
  /// <br>INTERNAL_ERROR: An unexpected system error was encountered. Please contact your vendor for assistance.</br>
  /// <br>CACHE_NOT_AVAILABLE: The requested record is not available in the system. Please contact your vendor for assistance.</br>
  /// <para>General OperationResult values(FingerPrint):</para>
  /// <br>INVALID_TEMPLATE: The submitted BiometricXml was not correctly formatted.</br>
  /// <br>INVALID_ANSI_TEMPLATE: The submitted template in BiometricXml was not valid ANSI template.</br>
  /// <br>INVALID_ISO_TEMPLATE: The submitted template in BiometricXml was not valid ISO template.</br>
  /// <br>INVALID_ICS_TEMPLATE: The submitted template in BiometricXml was not valid ICS template.</br>
  /// <br>CUSTOMER_INFO_NOT_FOUND: The specified CustomerKey was not found in the system. Please contat your vendor for assistance.</br>
  /// <br>INVALID_ENGINE: The specified EngineName was not valid.</br>
  /// <br>INVALID_REQUEST: The submitted request was not correctly formatted.</br>
  /// <br>LICENSE_ERROR: A system license limitation prevented your request from being fulfilled. Please contact your vendor for assistance.</br>
  /// <br>INTERNAL_ERROR: An unexpected system error was encountered. Please contact your vendor for assistance.</br>
  /// <br>CACHE_NOT_AVAILABLE: The requested record is not available in the system. Please contact your vendor for assistance.</br>
  /// </summary>
  /// <param name="CustomerKey">Customer-specific key provided by the vendor.</param>
  /// <param name="EngineName">The engine name for fingerprint biometrics is "FPFF02". The engine name for fingervein biometrics is "FVHT01"The engine name for face biometrics is "FACE01".The engine name for iris biometrics is "IRIS01".</param>
  /// <param name="RegistrationID">The unique identifier (Member ID) of the biometric enrollment that the requested operation will be performed on.</param>
  /// <param name="Format">The format of template. It might be ISO/ANSI/ICS. This parameter is need during passing the template.Required only FingerPrint engine</param>
  /// <param name="BiometricXml">The biometric template with xml formatting</param>
  /// <param name="Token">API authenticate token</param>
  /// <returns></returns>
  public Register(CloudABISBiometricRequest){
    return new Promise((resolve, reject) => {
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": CloudABISBiometricRequest.config.CloudABIS_API_URL + 'api/Biometric/Register',
        "method": "POST",
        "type": "POST",
        "headers": {
          "authorization": 'Bearer ' + CloudABISBiometricRequest.token,
          "content-type": "application/json",
          "cache-control": "no-cache",
          "postman-token": "79dfe13a-756b-80cc-3515-6af6b83b25a9"
        },
        "data": '{\r\n  "CustomerKey": "'+CloudABISBiometricRequest.config.CloudABISCustomerKey+'",\r\n  "EngineName": "'+CloudABISBiometricRequest.config.ENGINE_NAME+'",\r\n  "RegistrationID": "'+CloudABISBiometricRequest.registrationID+'",\r\n  "Format": "'+CloudABISBiometricRequest.config.TEMPLATE_FORMAT+'",\r\n  "BiometricXml": '+CloudABISBiometricRequest.templateXML+'\r\n}'
      }
      
      $.ajax(settings).done(function(response) {
        resolve(response);
      }).fail(function(err){
        reject(err);
      });
    });
  }

  /// <summary>
  /// Identify a member through biometric match, by comparing against all enrolled biometric records.
  /// <para>Operation-specific OperationResult values:</para>
  /// <br>Identify: MATCH_FOUND - Match found. (The submitted biometric data matched that of an enrolled member.)</br>
  /// <br>Identify: NO_MATCH_FOUND - No match found. (No enrolled members matched against the submitted biometric data.)</br>
  /// <br>Identify: POOR_IMAGE_QUALITY - The submitted face image(s) were not good enough quality to fulfill the request.</br>
  /// <para>General OperationResult values(FinverVein, Face, Iris):</para>
  /// <br>INVALID_TEMPLATE: The submitted BiometricXml was not correctly formatted.</br>
  /// <br>CUSTOMER_INFO_NOT_FOUND: The specified CustomerKey was not found in the system.Please contat your vendor for assistance.</br>
  /// <br>INVALID_ENGINE: The specified EngineName was not valid.</br>
  /// <br>INVALID_REQUEST: The submitted request was not correctly formatted.</br>
  /// <br>LICENSE_ERROR: A system license limitation prevented your request from being fulfilled. Please contact your vendor for assistance.</br>
  /// <br>INTERNAL_ERROR: An unexpected system error was encountered. Please contact your vendor for assistance.</br>
  /// <br>CACHE_NOT_AVAILABLE: The requested record is not available in the system. Please contact your vendor for assistance.</br>
  /// <para>General OperationResult values(FingerPrint):</para>
  /// <br>INVALID_TEMPLATE: The submitted BiometricXml was not correctly formatted.</br>
  /// <br>INVALID_ANSI_TEMPLATE: The submitted template in BiometricXml was not valid ANSI template.</br>
  /// <br>INVALID_ISO_TEMPLATE: The submitted template in BiometricXml was not valid ISO template.</br>
  /// <br>INVALID_ICS_TEMPLATE: The submitted template in BiometricXml was not valid ICS template.</br>
  /// <br>CUSTOMER_INFO_NOT_FOUND: The specified CustomerKey was not found in the system. Please contat your vendor for assistance.</br>
  /// <br>INVALID_ENGINE: The specified EngineName was not valid.</br>
  /// <br>INVALID_REQUEST: The submitted request was not correctly formatted.</br>
  /// <br>LICENSE_ERROR: A system license limitation prevented your request from being fulfilled. Please contact your vendor for assistance.</br>
  /// <br>INTERNAL_ERROR: An unexpected system error was encountered. Please contact your vendor for assistance.</br>
  /// <br>CACHE_NOT_AVAILABLE: The requested record is not available in the system. Please contact your vendor for assistance.</br>
  /// </summary>
  /// <param name="CustomerKey">Customer-specific key provided by the vendor.</param>
  /// <param name="EngineName">The engine name for fingerprint biometrics is "FPFF02". The engine name for fingervein biometrics is "FVHT01"The engine name for face biometrics is "FACE01".The engine name for iris biometrics is "IRIS01".</param>
  /// <param name="RegistrationID">The unique identifier (Member ID) of the biometric enrollment that the requested operation will be performed on.</param>
  /// <param name="Format">The format of template. It might be ISO/ANSI/ICS. This parameter is need during passing the template.Required only FingerPrint engine</param>
  /// <param name="BiometricXml">The biometric template with xml formatting</param>
  /// <param name="Token">API authenticate token</param>
  /// <returns></returns>
  public Identify(CloudABISBiometricRequest){
    return new Promise((resolve, reject) => {
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": CloudABISBiometricRequest.config.CloudABIS_API_URL + 'api/Biometric/Identify',
        "method": "POST",
        "type": "POST",
        "headers": {
          "authorization": 'Bearer ' + CloudABISBiometricRequest.token,
          "content-type": "application/json",
          "cache-control": "no-cache",
          "postman-token": "79dfe13a-756b-80cc-3515-6af6b83b25a9"
        },
        "data": '{\r\n  "CustomerKey": "'+CloudABISBiometricRequest.config.CloudABISCustomerKey+'",\r\n "EngineName": "'+CloudABISBiometricRequest.config.ENGINE_NAME+'",\r\n "Format": "'+CloudABISBiometricRequest.config.TEMPLATE_FORMAT+'",\r\n "BiometricXml": '+CloudABISBiometricRequest.templateXML+'\r\n}'
      }
      
      $.ajax(settings).done(function(response) {
        resolve(response);
      }).fail(function(err){
        reject(err);
      });
    });
  }

  /// <summary>
  /// Delete an enrolled member ID and its associated biometric data.
  /// <para>Operation-specific OperationResult values:</para>
  /// <br>DeleteID: DS - Deletion successful. (The Member ID and associated biometric data removed from system.)</br>
  /// <br>DeleteID: DF - Deletion failed.</br>
  /// <br>DeleteID: ID_NOT_EXIST - The Member ID doesn't exist in the system.</br>
  /// <para>General OperationResult values:</para>
  /// <br>CUSTOMER_INFO_NOT_FOUND: The specified CustomerKey was not found in the system. Please contat your vendor for assistance.</br>
  /// <br>INVALID_ENGINE: The specified EngineName was not valid.</br>
  /// <br>INVALID_REQUEST: The submitted request was not correctly formatted.</br>
  /// <br>LICENSE_ERROR: A system license limitation prevented your request from being fulfilled. Please contact your vendor for assistance.</br>
  /// <br>INTERNAL_ERROR: An unexpected system error was encountered. Please contact your vendor for assistance.</br>
  /// <br>CACHE_NOT_AVAILABLE: The requested record is not available in the system. Please contact your vendor for assistance.</br>
  /// </summary>
  /// <param name="CustomerKey">Customer-specific key provided by the vendor.</param>
  /// <param name="EngineName">The engine name for fingerprint biometrics is "FPFF02". The engine name for fingervein biometrics is "FVHT01"The engine name for face biometrics is "FACE01".The engine name for iris biometrics is "IRIS01".</param>
  /// <param name="RegistrationID">The unique identifier (Member ID) of the biometric enrollment that the requested operation will be performed on.</param>
  /// <param name="Token">API authenticate token</param>
  /// <returns></returns>
  public RemoveID(CloudABISBiometricRequest){
    return new Promise((resolve, reject) => {
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": CloudABISBiometricRequest.config.CloudABIS_API_URL + 'api/Biometric/RemoveID',
        "method": "POST",
        "type": "POST",
        "headers": {
          "authorization": 'Bearer ' + CloudABISBiometricRequest.token,
          "content-type": "application/json",
          "cache-control": "no-cache",
          "postman-token": "79dfe13a-756b-80cc-3515-6af6b83b25a9"
        },
        "data": '{\r\n  "CustomerKey": "'+CloudABISBiometricRequest.config.CloudABISCustomerKey+'",\r\n "EngineName": "'+CloudABISBiometricRequest.config.ENGINE_NAME+'",\r\n "RegistrationID": "'+CloudABISBiometricRequest.registrationID+'"\r\n}'
      }
      
      $.ajax(settings).done(function(response) {
        resolve(response);
      }).fail(function(err){
        reject(err);
      });
    });
  }

  /// <summary>
  /// Change the member ID associated with an existing enrollment to a new ID.
  /// <para>Operation-specific OperationResult values:</para>
  /// <br>ChangeID: CS - Change of ID successful. (The Member ID was changed to the specified new ID.)</br>
  /// <br>ChangeID: CF - Change of ID failed.</br>
  /// <br>ChangeID: ID_NOT_EXIST - The Member ID intent for change doesn't exist in the system.</br>
  /// <br>IsRegistered: YES - There is biometric data enrolled with the requested New Member ID.</br>
  /// <para>General OperationResult values:</para>
  /// <br>CUSTOMER_INFO_NOT_FOUND: The specified CustomerKey was not found in the system. Please contat your vendor for assistance.</br>
  /// <br>INVALID_ENGINE: The specified EngineName was not valid.</br>
  /// <br>INVALID_REQUEST: The submitted request was not correctly formatted.</br>
  /// <br>LICENSE_ERROR: A system license limitation prevented your request from being fulfilled. Please contact your vendor for assistance.</br>
  /// <br>INTERNAL_ERROR: An unexpected system error was encountered. Please contact your vendor for assistance.</br>
  /// <br>CACHE_NOT_AVAILABLE: The requested record is not available in the system. Please contact your vendor for assistance.</br>
  /// </summary>
  /// <param name="CustomerKey">Customer-specific key provided by the vendor.</param>
  /// <param name="EngineName">The engine name for fingerprint biometrics is "FPFF02". The engine name for fingervein biometrics is "FVHT01"The engine name for face biometrics is "FACE01".The engine name for iris biometrics is "IRIS01".</param>
  /// <param name="RegistrationID">The unique identifier (Member ID) of the biometric enrollment that the requested operation will be performed on.</param>
  /// <param name="NewRegistrationID">The new unique identifier (Member ID) that the existing ID will be changed to.</param>
  /// <param name="Token">API authenticate token</param>
  /// <returns></returns>
  public ChangeID(){

  }

  /// <summary>
  /// Verify against one member's enrolled biometric data.
  /// <para>Operation-specific OperationResult values:</para>
  /// <br>Verify: VS - Verification successful. (The submitted biometric data matched the requested member's enrolled biometric data.)</br>
  /// <br>Verify: VF - Verification failed. (The submitted biometric data did not match the requested member's enrolled biometric data.)</br>
  /// <br>Verify: ID_NOT_EXIST - The Member ID doesn't exist in the system.</br>
  /// <br>Verify: POOR_IMAGE_QUALITY - The submitted fingerprint image(s) were not good enough quality to fulfill the request.</br>
  /// <para>General OperationResult values(FinverVein, Face, Iris):</para>
  /// <br>INVALID_TEMPLATE: The submitted BiometricXml was not correctly formatted.</br>
  /// <br>CUSTOMER_INFO_NOT_FOUND: The specified CustomerKey was not found in the system.Please contat your vendor for assistance.</br>
  /// <br>INVALID_ENGINE: The specified EngineName was not valid.</br>
  /// <br>INVALID_REQUEST: The submitted request was not correctly formatted.</br>
  /// <br>LICENSE_ERROR: A system license limitation prevented your request from being fulfilled. Please contact your vendor for assistance.</br>
  /// <br>INTERNAL_ERROR: An unexpected system error was encountered. Please contact your vendor for assistance.</br>
  /// <br>CACHE_NOT_AVAILABLE: The requested record is not available in the system. Please contact your vendor for assistance.</br>
  /// <para>General OperationResult values(FingerPrint):</para>
  /// <br>INVALID_TEMPLATE: The submitted BiometricXml was not correctly formatted.</br>
  /// <br>INVALID_ANSI_TEMPLATE: The submitted template in BiometricXml was not valid ANSI template.</br>
  /// <br>INVALID_ISO_TEMPLATE: The submitted template in BiometricXml was not valid ISO template.</br>
  /// <br>INVALID_ICS_TEMPLATE: The submitted template in BiometricXml was not valid ICS template.</br>
  /// <br>CUSTOMER_INFO_NOT_FOUND: The specified CustomerKey was not found in the system. Please contat your vendor for assistance.</br>
  /// <br>INVALID_ENGINE: The specified EngineName was not valid.</br>
  /// <br>INVALID_REQUEST: The submitted request was not correctly formatted.</br>
  /// <br>LICENSE_ERROR: A system license limitation prevented your request from being fulfilled. Please contact your vendor for assistance.</br>
  /// <br>INTERNAL_ERROR: An unexpected system error was encountered. Please contact your vendor for assistance.</br>
  /// <br>CACHE_NOT_AVAILABLE: The requested record is not available in the system. Please contact your vendor for assistance.</br>
  /// </summary>
  /// <param name="CustomerKey">Customer-specific key provided by the vendor.</param>
  /// <param name="EngineName">The engine name for fingerprint biometrics is "FPFF02". The engine name for fingervein biometrics is "FVHT01"The engine name for face biometrics is "FACE01".The engine name for iris biometrics is "IRIS01".</param>
  /// <param name="RegistrationID">The unique identifier (Member ID) of the biometric enrollment that the requested operation will be performed on.</param>
  /// <param name="Format">The format of template. It might be ISO/ANSI/ICS. This parameter is need during passing the template.Required only FingerPrint engine</param>
  /// <param name="BiometricXml">The biometric template with xml formatting</param>
  /// <param name="Token">API authenticate token</param>
  /// <returns></returns>
  public Verify(){

  }

  /// <summary>
  /// Update the enrolled biometric data of a member.
  /// <para>Operation-specific OperationResult values:</para>
  /// <br>Update: SUCCESS - Update successful. (The biometric data associated with requested Member ID was updated in system.)</br>
  /// <br>Update: FAILED - Update Failed.</br>
  /// <br>Update: ID_NOT_EXIST - The Member ID doesn't exist in the system.</br>
  /// <br>Update: POOR_IMAGE_QUALITY - The submitted iris image(s) were not good enough quality to fulfill the request.</br>
  /// <br>Identify: MATCH_FOUND - Match found. (The submitted biometric data matched that of an enrolled member.)</br>
  /// <para>General OperationResult values(FingerVein,Face,Iris):</para>
  /// <br>INVALID_TEMPLATE: The submitted BiometricXml was not correctly formatted.</br>
  /// <br>CUSTOMER_INFO_NOT_FOUND: The specified CustomerKey was not found in the system.Please contat your vendor for assistance.</br>
  /// <br>INVALID_ENGINE: The specified EngineName was not valid.</br>
  /// <br>INVALID_REQUEST: The submitted request was not correctly formatted.</br>
  /// <br>LICENSE_ERROR: A system license limitation prevented your request from being fulfilled. Please contact your vendor for assistance.</br>
  /// <br>INTERNAL_ERROR: An unexpected system error was encountered. Please contact your vendor for assistance.</br>
  /// <br>CACHE_NOT_AVAILABLE: The requested record is not available in the system. Please contact your vendor for assistance.</br>
  /// <para>General OperationResult values(FingerPrint):</para>
  /// <br>INVALID_TEMPLATE: The submitted BiometricXml was not correctly formatted.</br>
  /// <br>INVALID_ANSI_TEMPLATE: The submitted template in BiometricXml was not valid ANSI template.</br>
  /// <br>INVALID_ISO_TEMPLATE: The submitted template in BiometricXml was not valid ISO template.</br>
  /// <br>INVALID_ICS_TEMPLATE: The submitted template in BiometricXml was not valid ICS template.</br>
  /// <br>CUSTOMER_INFO_NOT_FOUND: The specified CustomerKey was not found in the system. Please contat your vendor for assistance.</br>
  /// <br>INVALID_ENGINE: The specified EngineName was not valid.</br>
  /// <br>INVALID_REQUEST: The submitted request was not correctly formatted.</br>
  /// <br>LICENSE_ERROR: A system license limitation prevented your request from being fulfilled. Please contact your vendor for assistance.</br>
  /// <br>INTERNAL_ERROR: An unexpected system error was encountered. Please contact your vendor for assistance.</br>
  /// <br>CACHE_NOT_AVAILABLE: The requested record is not available in the system. Please contact your vendor for assistance.</br>
  /// </summary>
  /// <param name="CustomerKey">Customer-specific key provided by the vendor.</param>
  /// <param name="EngineName">The engine name for fingerprint biometrics is "FPFF02". The engine name for fingervein biometrics is "FVHT01"The engine name for face biometrics is "FACE01".The engine name for iris biometrics is "IRIS01".</param>
  /// <param name="RegistrationID">The unique identifier (Member ID) of the biometric enrollment that the requested operation will be performed on.</param>
  /// <param name="Format">The format of template. It might be ISO/ANSI/ICS. This parameter is need during passing the template.Required only FingerPrint engine</param>
  /// <param name="BiometricXml">The biometric template with xml formatting</param>
  /// <param name="Token">API authenticate token</param>
  /// <returns></returns>
  public Update(){

  }
}