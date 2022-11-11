import {
  Transfer as TransferEvent
} from "../generated/aPolEURS/CErc20Delegator"
import {
  Balance
} from "../generated/schema"
import { CErc20Delegator as ERC20Contract } from "../generated/aPolEURS/CErc20Delegator"

// all transfers
export function handleTransfer(event: TransferEvent): void {
  let erc20Contract = ERC20Contract.bind(event.address)
  const toAddress = event.params.to.toHexString()
  const idTo = toAddress + "-" + event.address.toHexString()
  let balanceTo = new Balance(idTo)
  balanceTo.contract = event.address.toHexString()
  balanceTo.owner = toAddress
  balanceTo.protocol = "aavePolygon"
  balanceTo.balance = erc20Contract.balanceOf(event.params.to)
  balanceTo.save()

  const fromAddress = event.params.from.toHexString()
  const idFrom = fromAddress + "-" + event.address.toHexString()
  let balanceFrom = new Balance(idFrom)
  balanceFrom.contract = event.address.toHexString()
  balanceFrom.owner = fromAddress
  balanceFrom.protocol = "aavePolygon"
  balanceFrom.balance = erc20Contract.balanceOf(event.params.from)
  balanceFrom.save()
}


