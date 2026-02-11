import { describe, expect, it } from "vitest";
import { databases } from "../config";
import type { Animal } from "../features/animals/types";
import { addData, deleteData, fetchData, updateData, type Tables } from "../services/services";
import supabase from "../utils/supabase";

const wrongTable = "wrong table name" as keyof Tables;
const animalTable = databases.animal;
const eventTable = databases.events;

export const setupAuthenticatedTest = async () => {
    const testUser = {
        email: 'test@example.com',
        password: 'Test123!'
    };
    const { data: session } = await supabase.auth.signInWithPassword(testUser);
    return {
        user: session.user, cleanup: async () => {
            await supabase.auth.signOut();
        }
    };
};

describe("fetchData", () => {
    it("should be declared", () => {
        expect(typeof fetchData).toBe("function");
    });
    it("should return an object", async () => {
        expect(typeof await fetchData(animalTable)).toBe("object");
    });
    it("data array should be empty if user is not authenticated", async () => {
        const { data } = await fetchData(animalTable);
        expect(data!.length).toBe(0);
    });
    it("should return the data if the user is authenticated", async () => {
        const { cleanup } = await setupAuthenticatedTest();
        const { data } = await fetchData(animalTable);
        expect(data!.length).toBeGreaterThan(0);
        await cleanup();
    })
    it("should return a null data object and an error object in case of bad request", async () => {
        const data = await fetchData(wrongTable);
        expect(data.data).toBe(null);
        expect(typeof data.error).toBe("object");
    });
    it("should return an error message in case of bad request", async () => {
        const { error } = await fetchData(wrongTable);
        expect(error).toHaveProperty("message");
        expect(error!.message.length).toBeGreaterThan(0);
    });

})

describe("addData", () => {
    const newAnimal: Omit<Animal, "id" | "created_at"> = {
        name: "test",
        type: "cat",
        breed: "egyptian mau",
        sex: "female",
        age: "adult",
        size: "small",
        photo_url: null,
        adopted_at: null,
        location: "barcelona"
    }

    it("should be declared", () => {
        expect(typeof addData).toBe("function");
    });
    it("should return an object", async () => {
        expect(typeof await addData(newAnimal as Animal, animalTable)).toBe("object");
    });
    it("should return an error if the user adding the data is not admin", async () => {
        const { data, error } = await addData(newAnimal as Animal, animalTable);
        expect(data).toBe(null);
        expect(error?.message.length).toBeGreaterThan(0);
    });
})

describe("deleteData", () => {
    const animalId = "e824c828-1234-1234-9f92-4e1d15a5fc8c"
    it("should be declared", () => {
        expect(typeof deleteData).toBe("function");
    });
    it("should return an object", async () => {
        expect(typeof await deleteData(animalId, eventTable)).toBe("object");
    });
})

describe("updateData", () => {
    const animalToUpdate: Omit<Animal, "id" | "created_at"> = {
        name: "test",
        type: "cat",
        breed: "egyptian mau",
        sex: "female",
        age: "adult",
        size: "small",
        photo_url: null,
        adopted_at: null,
        location: "barcelona"
    }
    it("should be declared", () => {
        expect(typeof updateData).toBe("function");
    });
    it("should return an object", async () => {
        expect(typeof await updateData(animalToUpdate as Animal, animalTable)).toBe("object");
    });
})