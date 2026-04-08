"""Config flow for TMDB Shows & Movies."""
from __future__ import annotations

import logging

import aiohttp
import voluptuous as vol
from homeassistant import config_entries
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .const import CONF_API_KEY, CONF_LANGUAGE, CONF_REGION, DOMAIN, TMDB_API_BASE

_LOGGER = logging.getLogger(__name__)

STEP_USER_DATA_SCHEMA = vol.Schema(
    {
        vol.Required(CONF_API_KEY): str,
        vol.Optional(CONF_LANGUAGE, default="en"): str,
        vol.Optional(CONF_REGION, default="US"): str,
    }
)


class TmdbShowsConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for TMDB Shows & Movies."""

    VERSION = 1

    async def async_step_user(self, user_input=None):
        """Handle the initial step."""
        errors = {}

        if user_input is not None:
            api_key = user_input[CONF_API_KEY].strip()
            language = user_input.get(CONF_LANGUAGE, "en").strip()

            try:
                session = async_get_clientsession(self.hass)
                url = f"{TMDB_API_BASE}/configuration"
                async with session.get(
                    url, params={"api_key": api_key}, timeout=aiohttp.ClientTimeout(total=10)
                ) as resp:
                    if resp.status == 401:
                        errors["base"] = "invalid_api_key"
                    elif resp.status != 200:
                        errors["base"] = "cannot_connect"
            except aiohttp.ClientError:
                errors["base"] = "cannot_connect"

            if not errors:
                await self.async_set_unique_id(DOMAIN)
                self._abort_if_unique_id_configured()
                region = user_input.get(CONF_REGION, "US").strip().upper()
                return self.async_create_entry(
                    title="TMDB Shows & Movies",
                    data={CONF_API_KEY: api_key, CONF_LANGUAGE: language, CONF_REGION: region},
                )

        return self.async_show_form(
            step_id="user",
            data_schema=STEP_USER_DATA_SCHEMA,
            errors=errors,
        )
