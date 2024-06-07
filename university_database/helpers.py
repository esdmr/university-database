from typing import Any
import pymysql
import pymysql.cursors

__all__ = [
    "escape_identifier",
    "insert_one",
    "update",
]


def escape_identifier(id: str) -> str:
    """
    Escapes an identifier (e.g. a table or column name) for use in SQL queries.

    This function takes a string representing an identifier and returns a quoted
    version of the identifier that can be safely used in SQL queries. It handles
    the case where the identifier contains backtick characters, which need to be
    escaped by doubling them.

    Args:
        id (str): The identifier to be escaped.

    Returns:
        str: The escaped identifier, enclosed in backticks.
    """

    # From <https://mariadb.com/kb/en/identifier-names/#quote-character>:
    #
    # > The regular quote character is the backtick character - `` ` ``, but if
    # > the `ANSI_QUOTES` `SQL_MODE` option is specified, a regular double quote
    # > - `"` may be used as well.
    # >
    # > The backtick character can be used as part of an identifier. In that
    # > case the identifier needs to be quoted. The quote character can be the
    # > backtick, but in that case, the backtick in the name must be escaped
    # > with another backtick.

    id = id.replace("`", "``")

    return f"`{id}`"


def insert_one(cur: pymysql.cursors.Cursor, table: str, **kw: Any) -> int:
    """
    Inserts a single row into the specified database table. Unless autocommit is
    enabled, you will have to manually call `connection.commit()`.

    Args:
        cur (pymysql.cursors.Cursor): The database cursor to use for the insert.
        table (str): The name of the database table to insert the row into.
        **kw (Any): The column values to insert, with the column names as
            keyword arguments.

    Returns:
        int: The ID of the newly inserted row.
    """

    table = escape_identifier(table)
    columns = ",".join([escape_identifier(key) for key in kw.keys()])
    placeholders = ",".join(["%s"] * len(kw))
    args = list(kw.values())

    cur.execute(f"INSERT INTO {table}({columns}) VALUE ({placeholders})", args)

    return cur.lastrowid


def insert_many(cur: pymysql.cursors.Cursor, table: str, *entries: dict[str, Any]):
    """
    Inserts multiple rows into the specified database table. Unless autocommit is
    enabled, you will have to manually call `connection.commit()`.

    Args:
        cur (pymysql.cursors.Cursor): The database cursor to use for the
            inserts.
        table (str): The name of the database table to insert the rows into.
        *entries (dict[str, Any]): A sequence of dictionaries, where each
            dictionary represents a row to insert, with the column names as keys
            and the corresponding values.

    Returns:
        None
    """

    table = escape_identifier(table)
    keys: list[str] = list(set().union(*entries))
    columns = ",".join([escape_identifier(key) for key in keys])
    placeholders = ["(" + ",".join(["%s"] * len(keys)) + ")"] * len(entries)
    args = [entry.get(key, None) for entry in entries for key in keys]

    cur.execute(f"INSERT INTO {table}({columns}) VALUES ({placeholders})", args)


def update(cur: pymysql.cursors.Cursor, table: str, id: int, **kw: Any):
    """
    Updates a single row in the specified database table. Unless autocommit is
    enabled, you will have to manually call `connection.commit()`.

    Args:
        cur (pymysql.cursors.Cursor): The database cursor to use for the update.
        table (str): The name of the database table to update the row in.
        id (int): The ID of the row to update.
        **kw (Any): The column values to update, with the column names as
            keyword arguments.

    Returns:
        None
    """

    table = escape_identifier(table)
    assignments = ",".join([f"{escape_identifier(i)} = %s" for i in kw.keys()])
    args = [*kw.values(), id]

    cur.execute(
        f"UPDATE {table} SET {assignments} WHERE id = %s",
        args,
    )
