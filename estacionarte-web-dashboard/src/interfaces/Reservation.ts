export default interface Reservation{
    id:Number,
    parkingId:String,
    parkingSpotId:String,
    idUser:String,
    idVehicle:String,
    reservationDate: String,
    userArrivedDate: String,
    userLeftDate: String,
    cancelationDate: String
}