import sqlite3

import pandas as pd

import streamlit as st


# Function to fetch tables from the SQLite database

def get_tables(conn):
    query = "SELECT name FROM sqlite_master WHERE type='table';"

    return pd.read_sql(query, conn)


# Function to fetch data from a specific table

def get_table_data(conn, table_name):
    query = f"SELECT * FROM {table_name};"

    return pd.read_sql(query, conn)


# Streamlit app

def main():
    st.title("SQLite Database Viewer - linen_management.db")

    # Set the path to the SQLite file (linen_management.db)

    db_file = 'linen_management.db'

    # Connect to the SQLite database

    conn = sqlite3.connect(db_file)

    # Display tables

    st.header("Tables in the Database")

    tables = get_tables(conn)

    st.write(tables)

    # Select table to view data

    table_name = st.selectbox("Select a table to view", tables["name"])

    # Display table data

    st.header(f"Data from table: {table_name}")

    table_data = get_table_data(conn, table_name)

    st.write(table_data)

    conn.close()


if __name__ == "__main__":
    main()

