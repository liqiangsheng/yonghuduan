export function positionSeesionFun(_this) {
    _this.indexId = "1";
    let reviseMsg = _this.$store.state.revisePosition;
    _this.streetId = reviseMsg.linkmanAreaId;
    _this.position = (reviseMsg.linkmanDetails.substring(0, reviseMsg.linkmanDetails.indexOf("区") + 1));
    let index = reviseMsg.linkmanDetails.indexOf("道") + 1;
    _this.isStreet = reviseMsg.linkmanDetails.substring(reviseMsg.linkmanDetails.indexOf("区") + 1, index);
    _this.tel = reviseMsg.linkmanPhoneNum;
  _this.name = reviseMsg.linkmanName;
  _this.id = reviseMsg.id;

  _this.text=reviseMsg.linkmanDetails.substring(reviseMsg.linkmanDetails.indexOf("道") + 1);

 _this.shiId=reviseMsg.linkmanAreaId.substring(0,reviseMsg.linkmanAreaId.length-2)

}
export function positionEdit(){
  this.indexId="1";
  let msg=this.$store.state.revisePosition
  this.tel = msg.linkmanPhoneNum;
  this.streetId = msg.linkmanAreaId;
  this.name = msg.linkmanName;
  this.id = msg.id;
  this.iframe_address=msg.linkmanBuilding;
  this.text=msg.linkmanAddress
}
