const TOKEN = process.env.AIRTABLE_TOKEN!;
const BASE_ID = process.env.AIRTABLE_BASE_ID!;
const TABLE_NAME = process.env.AIRTABLE_TABLE_NAME!;

export async function getInternshipById(id: string) {
  const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}?filterByFormula={id}='${id}'`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json"
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch internship');
  }

  const data = await res.json();

  if (data.records.length === 0) return null;

  const fields = data.records[0].fields;

  return {
    id,
    title: fields.title,
    company: fields.company,
    location: fields.location,
   
    stipend: fields.stipend,
    description: fields.description,
    
    applyLink: fields.applyLink,
  };
}


export async function getFeaturedInternships(limit = 6) {
  const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}?maxRecords=${limit}&view=Grid%20view&sort[0][field]=Created&sort[0][direction]=desc`;

  console.log("Fetching from:", url);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error("Response status:", res.status);
    throw new Error('Failed to fetch internships');
  }

  const data = await res.json();

  return data.records.map((record: any) => ({
    id: record.fields.id,
    title: record.fields.title,
    company: record.fields.company,
    location: record.fields.location,
    stipend: record.fields.stipend,
    description: record.fields.description,
    applyLink: record.fields.applyLink,
  }));
}



