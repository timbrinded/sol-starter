#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("4BTeVU7EXaDVCvYbZiWLgYinhiR4iJL7hhyRzwdP2au5");

#[program]
pub mod solanadapp {
    use super::*;

    pub fn close(_ctx: Context<CloseSolanadapp>) -> Result<()> {
        Ok(())
    }

    pub fn decrement(ctx: Context<Update>) -> Result<()> {
        ctx.accounts.solanadapp.count = ctx.accounts.solanadapp.count.checked_sub(1).unwrap();
        Ok(())
    }

    pub fn increment(ctx: Context<Update>) -> Result<()> {
        ctx.accounts.solanadapp.count = ctx.accounts.solanadapp.count.checked_add(1).unwrap();
        Ok(())
    }

    pub fn initialize(_ctx: Context<InitializeSolanadapp>) -> Result<()> {
        Ok(())
    }

    pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
        ctx.accounts.solanadapp.count = value.clone();
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeSolanadapp<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
  init,
  space = 8 + Solanadapp::INIT_SPACE,
  payer = payer
    )]
    pub solanadapp: Account<'info, Solanadapp>,
    pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseSolanadapp<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
  mut,
  close = payer, // close account and return lamports to payer
    )]
    pub solanadapp: Account<'info, Solanadapp>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub solanadapp: Account<'info, Solanadapp>,
}

#[account]
#[derive(InitSpace)]
pub struct Solanadapp {
    count: u8,
}
