import { Typography, Card, CardActions, CardMedia, CardContent, Button, Stack } from "@mui/material";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

const fetchHotels = async () => {
	const response = await fetch("http://localhost:3001/hotels");
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json();
};

const HotelList = () => {
	const {
		data: hotels,
		isLoading,
		error,
	} = useQuery({ queryKey: ["hotels"], queryFn: fetchHotels });

	if (isLoading) {
		return <div>Cargando...</div>;
	}

	if (error) {
		return <div>Error fetching Hotels! {error.message}</div>;
	}

	return (
		<>
			<Typography variant={"h4"} marginBottom={5} component={"h1"} display={"flex"} justifyContent={"center"}>
				Haga su reserva!
			</Typography>
			<Stack spacing={5} alignItems={"center"}>
				{hotels.map((hotel) => (
					<Link key={hotel.id} href={`/hotel/${hotel.id}`}>
						<Card sx={{ maxWidth: 345, backgroundColor: "#e8e8e8" }}>
							<CardMedia
								sx={{ height: 140 }}
								image={hotel.image}
								title={hotel.name}
							/>
							<CardContent>
								<Typography gutterBottom variant={"h5"} component={"div"}>
									{hotel.name}
								</Typography>
								<Typography variant={"body2"} color={"text.secondary"}>
									{hotel.description}
								</Typography>
							</CardContent>
							<CardActions  sx={{ justifyContent:"center" }}>
								<Button size={"small"}>See Details</Button>
							</CardActions>
						</Card>
					</Link>
				))}
			</Stack>
		</>
	);
};

export default HotelList;