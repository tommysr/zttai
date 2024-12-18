import type { Shipment } from '../../../declarations/canister/canister.did';
import { anonymousBackend } from '$lib/canisters';
import { stateWallet, wallet } from '$lib/wallet.svelte';
import type { LoadEvent } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad } */
export async function load({ url }: LoadEvent): Promise<{
	pendingShipments: Shipment[];
	registeredCarrier: boolean;
	registeredCustomer: boolean;
	carried: Shipment[];
	created: Shipment[];
}> {
	const pendingShipments = await anonymousBackend.listPendingShipments();

	let carried: Shipment[] = [];
	let created: Shipment[] = [];

	if (stateWallet.actor) {
		let [car, cus] = await stateWallet.actor.listUserShipments();
		carried = car;
		created = cus;
	}

	console.log('pendingShipments:', pendingShipments);
	console.log('carried:', carried);
	console.log('created:', created);

	return {
		pendingShipments,
		carried,
		created
	};
}