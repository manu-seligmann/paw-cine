import {
    ArrayNotEmpty,
    IsEmail,
    IsInt,
    IsNumber,
    IsPhoneNumber,
    Length,
} from 'class-validator';

export class CreatePreReservationDto {
    @IsInt()
    showId: number;

    @Length(1, 50)
    clientName: string;

    @IsEmail()
    clientEmail: string;

    @Length(5, 20)
    clientPhone: string;

    @IsNumber({ allowNaN: false }, { each: true })
    @ArrayNotEmpty()
    seatsId: number[];
}
