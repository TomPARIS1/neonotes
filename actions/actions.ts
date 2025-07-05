'use server';

import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server"

export async function createNewDocument() {
    auth.protect();

    const {sessionClaims} = await auth();

    const docCollectionRef = adminDb.collection("documents");
    const docRef = await docCollectionRef.add({
        title: "Nouveau document"
    });

    await adminDb.collection('users').doc(sessionClaims?.email!).collection('rooms').doc(docRef.id).set({
        userId: sessionClaims?.email!,
        role: "owner",
        createdAt: new Date(),
        roomId: docRef.id,
    });

    return { docId: docRef.id };
}

export async function deleteDocument(roomId: string) {
    auth.protect();

    const {sessionClaims} = await auth();

    try {
        // Delete the document reference itslef
        await adminDb.collection('documents').doc(roomId).delete();

        const query = await adminDb
        .collectionGroup('rooms')
        .where('roomId', '==', roomId)
        .get();

        const batch = adminDb.batch();


        //Delete the room reference in the user's collection for every user in the room
        query.forEach((doc) => {
            batch.delete(doc.ref);
        });

        await batch.commit();

        // Delete the room in liveblocs
        await liveblocks.deleteRoom(roomId);
    } catch (error) {
        console.error("Error deleting document:", error);
        return { success: false, error: "Failed to delete document" };
    }
}

export async function inviteUserToDocument(roomId: string, email: string) {
    auth.protect();

    const {sessionClaims} = await auth();

    try {
        // Add the user to the document's room
        await adminDb
            .collection('users')
            .doc(email)
            .collection('rooms')
            .doc(roomId)
            .set({
                userId: email,
                role: "editor",
                createdAt: new Date(),
                roomId,
            });

        return true;
    } catch (error) {
        console.error("Error inviting user:", error);
        return false;
    }
}

export async function removeUserFromDocument(roomId: string, email: string) {
    auth.protect();

    const {sessionClaims} = await auth();

    try {
        // Remove the user from the document's room
        await adminDb
            .collection('users')
            .doc(email)
            .collection('rooms')
            .doc(roomId)
            .delete();

        return { success: true };
    } catch (error) {
        console.error("Error removing user:", error);
        return { success: false, error: "Failed to remove user" };
    }
}