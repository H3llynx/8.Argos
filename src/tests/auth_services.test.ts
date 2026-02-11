import { describe, expect, it } from "vitest";
import { getUserRole, loadUser } from "../features/auth/services/auth";
import supabase from "../utils/supabase";

export const setupAuthenticatedTest = async () => {
    const testUser = {
        email: 'test@example.com',
        password: 'Test123!'
    };
    const { data: session } = await supabase.auth.signInWithPassword(testUser);
    return {
        user: session.user,
        cleanup: async () => {
            await supabase.auth.signOut();
        }
    };
};

export const setupAdminTest = async () => {
    const adminUser = {
        email: 'admin-test@example.com',
        password: 'Admin123!'
    };
    const { data: session } = await supabase.auth.signInWithPassword(adminUser);

    return {
        user: session.user,
        cleanup: async () => {
            await supabase.auth.signOut();
        }
    };
};

describe("loadUser", () => {
    it("should be declared", () => {
        expect(typeof loadUser).toBe("function");
    });
    it("should return null if there is no active authenticated session", async () => {
        expect(await loadUser()).toBe(null);
    });
    it("should return user if there is an active authenticated session", async () => {
        const { cleanup } = await setupAuthenticatedTest();
        const user = await loadUser();
        expect(user?.id.length).toBeGreaterThan(0);
        await cleanup();
    });
});

describe("getUserRole", () => {
    it("should be declared", () => {
        expect(typeof getUserRole).toBe("function");
    });
    it("should return the logged user status", async () => {
        const { cleanup, user } = await setupAuthenticatedTest();
        const role = await getUserRole(user!.id);
        expect(role).toBe("user");
        await cleanup();
    });
    it("should return the logged user status", async () => {
        const { cleanup, user } = await setupAdminTest();
        const role = await getUserRole(user!.id);
        expect(role).toBe("admin");
        await cleanup();
    });
})