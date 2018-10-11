import os


def is_flask_reload(debug_environment: os._Environ) -> bool:
    """Return whether or not the current run of flask is a reload."""
    return 'WERKZEUG_RUN_MAIN' not in debug_environment
