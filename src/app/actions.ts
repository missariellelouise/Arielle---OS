"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

function str(formData: FormData, key: string): string | undefined {
  const v = formData.get(key);
  return typeof v === "string" && v.trim() !== "" ? v.trim() : undefined;
}

function num(formData: FormData, key: string): number | undefined {
  const v = str(formData, key);
  return v !== undefined ? Number(v) : undefined;
}

function date(formData: FormData, key: string): Date | undefined {
  const v = str(formData, key);
  return v !== undefined ? new Date(v) : undefined;
}

// ---------- ListItem (generic checklist sections) ----------

export async function createListItem(formData: FormData) {
  const section = str(formData, "section");
  const group = str(formData, "group");
  const title = str(formData, "title");
  if (!section || !group || !title) return;

  await db.listItem.create({
    data: { section, group, title, notes: str(formData, "notes"), dueDate: date(formData, "dueDate") },
  });
  revalidatePath(`/${section}`);
  revalidatePath("/");
}

export async function toggleListItem(id: string, section: string, done: boolean) {
  await db.listItem.update({ where: { id }, data: { done } });
  revalidatePath(`/${section}`);
  revalidatePath("/");
}

export async function deleteListItem(id: string, section: string) {
  await db.listItem.delete({ where: { id } });
  revalidatePath(`/${section}`);
  revalidatePath("/");
}

// ---------- Contacts (CRM) ----------

export async function createContact(formData: FormData) {
  const name = str(formData, "name");
  const category = str(formData, "category");
  if (!name || !category) return;

  await db.contact.create({
    data: {
      name,
      category,
      whereMet: str(formData, "whereMet"),
      lastConversation: str(formData, "lastConversation"),
      followUpDate: date(formData, "followUpDate"),
      interests: str(formData, "interests"),
      collaborationIdeas: str(formData, "collaborationIdeas"),
      notes: str(formData, "notes"),
    },
  });
  revalidatePath("/crm");
}

export async function deleteContact(id: string) {
  await db.contact.delete({ where: { id } });
  revalidatePath("/crm");
}

// ---------- Transactions (Finance) ----------

export async function createTransaction(formData: FormData) {
  const type = str(formData, "type");
  const label = str(formData, "label");
  const amount = num(formData, "amount");
  if (!type || !label || amount === undefined) return;

  await db.transaction.create({
    data: {
      type,
      label,
      amount,
      client: str(formData, "client"),
      date: date(formData, "date") ?? new Date(),
      dueDate: date(formData, "dueDate"),
      recurring: str(formData, "recurring") === "on",
    },
  });
  revalidatePath("/finance");
  revalidatePath("/");
}

export async function deleteTransaction(id: string) {
  await db.transaction.delete({ where: { id } });
  revalidatePath("/finance");
  revalidatePath("/");
}

// ---------- Project Hub (Kanban) ----------

export async function createProjectCard(formData: FormData) {
  const title = str(formData, "title");
  const category = str(formData, "category");
  if (!title || !category) return;

  await db.projectCard.create({ data: { title, category, notes: str(formData, "notes") } });
  revalidatePath("/project-hub");
  revalidatePath("/");
}

export async function updateProjectCardStatus(id: string, status: string) {
  await db.projectCard.update({ where: { id }, data: { status } });
  revalidatePath("/project-hub");
  revalidatePath("/");
}

export async function deleteProjectCard(id: string) {
  await db.projectCard.delete({ where: { id } });
  revalidatePath("/project-hub");
  revalidatePath("/");
}

// ---------- Opportunity Pipeline ----------

export async function createOpportunity(formData: FormData) {
  const title = str(formData, "title");
  const type = str(formData, "type");
  if (!title || !type) return;

  await db.opportunity.create({
    data: {
      title,
      type,
      status: str(formData, "status") ?? "researching",
      deadline: date(formData, "deadline"),
      contactPerson: str(formData, "contactPerson"),
      requiredMaterials: str(formData, "requiredMaterials"),
      followUpDate: date(formData, "followUpDate"),
      outcome: str(formData, "outcome"),
      notes: str(formData, "notes"),
    },
  });
  revalidatePath("/opportunities");
}

export async function updateOpportunityStatus(id: string, status: string) {
  await db.opportunity.update({ where: { id }, data: { status } });
  revalidatePath("/opportunities");
}

export async function deleteOpportunity(id: string) {
  await db.opportunity.delete({ where: { id } });
  revalidatePath("/opportunities");
}

// ---------- Brand HQ ----------

export async function updateBrand(formData: FormData) {
  const id = str(formData, "id");
  if (!id) return;

  await db.brand.update({
    where: { id },
    data: {
      mission: str(formData, "mission"),
      vision: str(formData, "vision"),
      voice: str(formData, "voice"),
      targetAudience: str(formData, "targetAudience"),
      goals: str(formData, "goals"),
      guidelines: str(formData, "guidelines"),
      colorPalette: str(formData, "colorPalette"),
      fonts: str(formData, "fonts"),
      competitors: str(formData, "competitors"),
    },
  });
  revalidatePath("/brand-hq");
}

// ---------- Meetings ----------

export async function createMeeting(formData: FormData) {
  const title = str(formData, "title");
  const meetingDate = date(formData, "date");
  if (!title || !meetingDate) return;

  await db.meeting.create({
    data: {
      title,
      date: meetingDate,
      summary: str(formData, "summary"),
      decisions: str(formData, "decisions"),
      actionItems: str(formData, "actionItems"),
      followUpDate: date(formData, "followUpDate"),
    },
  });
  revalidatePath("/meetings");
  revalidatePath("/");
}

export async function deleteMeeting(id: string) {
  await db.meeting.delete({ where: { id } });
  revalidatePath("/meetings");
  revalidatePath("/");
}

// ---------- Calendar (Events) ----------

export async function createEvent(formData: FormData) {
  const label = str(formData, "label");
  const eventDate = date(formData, "date");
  if (!label || !eventDate) return;

  await db.event.create({ data: { label, date: eventDate } });
  revalidatePath("/calendar");
  revalidatePath("/");
}

export async function deleteEvent(id: string) {
  await db.event.delete({ where: { id } });
  revalidatePath("/calendar");
  revalidatePath("/");
}

// ---------- Deadlines (Home widget) ----------

export async function createDeadline(formData: FormData) {
  const label = str(formData, "label");
  const deadlineDate = date(formData, "date");
  if (!label || !deadlineDate) return;

  await db.deadline.create({ data: { label, date: deadlineDate } });
  revalidatePath("/");
}

export async function deleteDeadline(id: string) {
  await db.deadline.delete({ where: { id } });
  revalidatePath("/");
}

// ---------- Metrics (Home widgets, e.g. followers gained) ----------

export async function updateMetric(formData: FormData) {
  const key = str(formData, "key");
  const value = num(formData, "value");
  if (!key || value === undefined) return;

  await db.metric.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
  revalidatePath("/");
}
