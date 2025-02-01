import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
	try {
		const templatesDir = path.join(process.cwd(), "components/TemplatesList");
		const templateFiles = fs
			.readdirSync(templatesDir)
			.map((file) => path.basename(file, ".tsx"));
		return NextResponse.json(templateFiles);
	} catch (error) {
		console.error(error);
		return NextResponse.error();
	}
}
