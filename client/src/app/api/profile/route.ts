import { UserProfile } from "@/app/page";
import { EXTERNAL_URL} from "@/utils/constants";
import fetchRequest from "@/utils/fetch-request";
import { NextResponse } from "next/server";


export async function POST(request:Request) {
  try {
    const body = await request.json();
   const {token} = body;
    const responseJson = await fetchRequest<undefined,UserProfile>({
      url: `${EXTERNAL_URL}user/profile`,
      method: "GET",
      token
    });
     return NextResponse.json(responseJson);
  } catch (err) {
    const error = err as ErrorResponse; 
    console.log(err)
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode }
    );
  }
}