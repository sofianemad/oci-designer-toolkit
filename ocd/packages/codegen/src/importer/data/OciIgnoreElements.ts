/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import { OcdIgnoreElements } from "../../types/OcdImporterData";

export const ignoreElements: OcdIgnoreElements = {
    "common": [
        "created_by",
        "id",
        "inactive_state",
        "is_accessible",
        "state",
        "system_tags",
        "time_created",
        "timeouts"
    ],
    "oci_containerengine_cluster": [
        "endpoints",
        "metadata"
    ],
    "oci_containerengine_node_pool": [
        "node_source",
        "nodes"
    ],
    "oci_core_drg": [
        "default_drg_route_tables",
        "default_export_drg_route_distribution_id"
    ],
    "oci_core_drg_attachment": [
        "remove_export_drg_route_distribution_trigger"
    ],
    "oci_core_instance": [
        "assign_private_dns_record",
        "availability_config",
        "baseline_ocpu_utilization",
        "boot_volume_id",
        "capacity_reservation_id",
        "dedicated_vm_host_id",
        "extended_metadata",
        "gpu_description",
        "gpus",
        "instance_options",
        "ipxe_script",
        "launch_mode",
        "launch_options",
        "local_disk_description",
        "local_disks",
        "local_disks_total_size_in_gbs",
        "max_vnic_attachments",
        "networking_bandwidth_in_gbps",
        "platform_config",
        "preemptible_instance_config",
        "preserve_boot_volume",
        "private_ip",
        "processor_description",
        "public_ip",
        "time_maintenance_reboot_due",
        "vlan_id"
    ],
    "oci_core_nat_gateway": [
        "nat_ip",
        "public_ip_id"
    ],
    "oci_core_subnet": [
        "ipv6virtual_router_ip",
        "subnet_domain_name",
        "virtual_router_ip",
        "virtual_router_mac"
    ],
    "oci_core_volume": [
        "is_auto_tune_enabled",
        "size_in_mbs"
    ],
    "oci_core_vcn": [
        "cidr_block",
        "default_dhcp_options_id",
        "default_route_table_id",
        "default_security_list_id",
        "ipv6public_cidr_block",
        "vcn_domain_name"
    ],
    "oci_database_autonomous_database": [
        "apex_details",
        "backup_config",
        "connection_strings",
        "connection_urls",
        "standby_db",
        "time_deletion_of_free_autonomous_database",
        "time_maintenance_begin",
        "time_maintenance_end",
        "time_of_last_failover",
        "time_of_last_refresh",
        "time_of_last_refresh_point",
        "time_of_last_switchover",
        "time_of_next_refresh",
        "time_reclamation_of_free_autonomous_database"
    ],
    "oci_database_db_system": [
        "connection_strings",
        "iorm_config_cache",
        "maintenance_window"
    ],
    "oci_file_storage_file_system": [
        "source_details"
    ],
    "oci_kms_key": [
        "replica_details"
    ],
    "oci_kms_vault": [
        "replica_details"
    ],
    "oci_load_balancer_load_balancer": [
        "ip_address_details"
    ],
    "oci_mysql_mysql_db_system": [
        "analytics_cluster",
        "channels",
        "current_placement",
        "endpoints",
        "heat_wave_cluster"
    ],
    "oci_network_load_balancer_network_load_balancer": [
        "ip_addresses"
    ],
    "oci_nosql_table": [
        "schema"
    ],
    "oci_objectstorage_bucket": [
        "etag",
        "object_lifecycle_policy_etag"
    ]
}